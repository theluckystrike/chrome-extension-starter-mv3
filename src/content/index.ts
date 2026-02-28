// Content Script
// Injected into web pages based on manifest.json matches

import { initMessageListener, onMessage } from '../lib/messaging';

// Initialize content script message handling
initMessageListener();

onMessage('GET_PAGE_INFO', async () => {
    return {
        title: document.title,
        url: window.location.href,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    };
});

// Shadow DOM injection for isolated UI
export function injectShadowUI(html: string, css: string): ShadowRoot {
    const host = document.createElement('div');
    host.id = 'extension-shadow-host';
    const shadow = host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = css;
    shadow.appendChild(style);

    const container = document.createElement('div');
    container.innerHTML = html;
    shadow.appendChild(container);

    document.body.appendChild(host);
    return shadow;
}

console.log('[Extension] Content script loaded');
