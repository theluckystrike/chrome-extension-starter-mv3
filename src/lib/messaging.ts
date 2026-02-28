// Chrome Extension Message Passing Utility
// Simplified, type-safe message passing between extension contexts

export interface Message<T = unknown> {
    type: string;
    payload?: T;
}

export interface MessageResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

type MessageHandler<TPayload = unknown, TResponse = unknown> = (
    payload: TPayload,
    sender: chrome.runtime.MessageSender
) => Promise<TResponse> | TResponse;

const handlers = new Map<string, MessageHandler>();

/**
 * Register a message handler for a specific message type
 */
export function onMessage<TPayload = unknown, TResponse = unknown>(
    type: string,
    handler: MessageHandler<TPayload, TResponse>
): void {
    handlers.set(type, handler as MessageHandler);
}

/**
 * Send a message to the background service worker
 */
export async function sendMessage<TResponse = unknown, TPayload = unknown>(
    type: string,
    payload?: TPayload
): Promise<MessageResponse<TResponse>> {
    try {
        const response = await chrome.runtime.sendMessage<Message<TPayload>, MessageResponse<TResponse>>({
            type,
            payload,
        });
        return response;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Send a message to a specific tab's content script
 */
export async function sendTabMessage<TResponse = unknown, TPayload = unknown>(
    tabId: number,
    type: string,
    payload?: TPayload
): Promise<MessageResponse<TResponse>> {
    try {
        const response = await chrome.tabs.sendMessage<Message<TPayload>, MessageResponse<TResponse>>(
            tabId,
            { type, payload }
        );
        return response;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Initialize the message listener (call once in background/content script)
 */
export function initMessageListener(): void {
    chrome.runtime.onMessage.addListener(
        (message: Message, sender, sendResponse) => {
            const handler = handlers.get(message.type);
            if (!handler) {
                sendResponse({ success: false, error: `No handler for message type: ${message.type}` });
                return false;
            }

            Promise.resolve(handler(message.payload, sender))
                .then((data) => sendResponse({ success: true, data }))
                .catch((error) =>
                    sendResponse({
                        success: false,
                        error: error instanceof Error ? error.message : 'Handler error',
                    })
                );

            return true; // Keep message channel open for async response
        }
    );
}
