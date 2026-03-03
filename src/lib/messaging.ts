// Chrome Extension Message Passing Utility
// Simplified, type-safe message passing between extension contexts

export class MessagingError extends Error {
    constructor(
        message: string,
        public code: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'MessagingError';
        if (originalError?.stack) {
            this.stack = originalError.stack;
        }
    }
}

export const MessagingErrorCode = {
    SEND_FAILED: 'SEND_FAILED',
    TAB_SEND_FAILED: 'TAB_SEND_FAILED',
    NO_HANDLER: 'NO_HANDLER',
    HANDLER_ERROR: 'HANDLER_ERROR',
    TIMEOUT: 'TIMEOUT',
} as const;

export interface Message<T = unknown> {
    type: string;
    payload?: T;
}

export interface MessageResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    errorCode?: string;
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
        const err = error as Error;
        // Check for common error patterns
        if (err.message?.includes('No message receiver')) {
            return {
                success: false,
                error: `No listener found for message type "${type}". Make sure the background script is running and has registered this handler.`,
                errorCode: MessagingErrorCode.NO_HANDLER,
            };
        }
        if (err.message?.includes('Could not establish connection')) {
            return {
                success: false,
                error: `Could not connect to extension. The background script may not be running or the extension context may be invalid.`,
                errorCode: MessagingErrorCode.SEND_FAILED,
            };
        }
        return {
            success: false,
            error: err.message || 'Unknown error occurred while sending message',
            errorCode: MessagingErrorCode.SEND_FAILED,
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
        const err = error as Error;
        if (err.message?.includes('No message receiver')) {
            return {
                success: false,
                error: `No listener found in tab ${tabId} for message type "${type}". Make sure the content script is injected and has registered this handler.`,
                errorCode: MessagingErrorCode.NO_HANDLER,
            };
        }
        if (err.message?.includes('Could not establish connection')) {
            return {
                success: false,
                error: `Could not connect to tab ${tabId}. The content script may not be injected or the tab may have been unloaded.`,
                errorCode: MessagingErrorCode.TAB_SEND_FAILED,
            };
        }
        return {
            success: false,
            error: err.message || 'Unknown error occurred while sending tab message',
            errorCode: MessagingErrorCode.TAB_SEND_FAILED,
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
                const availableTypes = Array.from(handlers.keys());
                sendResponse({ 
                    success: false, 
                    error: `No handler registered for message type: ${message.type}. ` +
                           (availableTypes.length > 0 
                               ? `Available types: ${availableTypes.join(', ')}`
                               : 'No handlers registered yet.'),
                    errorCode: MessagingErrorCode.NO_HANDLER
                });
                return false;
            }

            Promise.resolve(handler(message.payload, sender))
                .then((data) => sendResponse({ success: true, data }))
                .catch((error) =>
                    sendResponse({
                        success: false,
                        error: error instanceof Error ? error.message : 'Handler error',
                        errorCode: MessagingErrorCode.HANDLER_ERROR,
                    })
                );

            return true; // Keep message channel open for async response
        }
    );
}
