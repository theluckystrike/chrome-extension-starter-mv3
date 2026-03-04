# chrome-extension-starter-mv3

> Production-ready Chrome Extension starter template with TypeScript, React 18, Tailwind CSS, Webpack 5, and Manifest V3.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **TypeScript** -- Full type safety with strict mode enabled
- **React 18** -- Modern UI for popup and options pages
- **Tailwind CSS** -- Utility-first styling with PostCSS and Autoprefixer
- **Webpack 5** -- Development watch mode and optimized production builds
- **Manifest V3** -- Service worker background script, modern Chrome APIs
- **Type-Safe Messaging** -- Built-in `sendMessage`, `sendTabMessage`, and `onMessage` utilities with generics
- **Storage Wrapper** -- `Storage` class supporting `local`, `sync`, and `session` areas with typed get/set
- **Shadow DOM Injection** -- Isolated content script UI via `injectShadowUI`
- **Jest Testing** -- Pre-configured with `ts-jest` and `jsdom` environment
- **ESLint + Prettier** -- Code quality and formatting out of the box
- **GitHub Actions CI** -- Automated type-checking and tests on Node 18 and 20

## Quick Start

```bash
# Clone the template
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git my-extension
cd my-extension

# Install dependencies
npm install

# Start development (builds + watches for changes)
npm run dev
```

Load in Chrome: open `chrome://extensions`, enable **Developer Mode**, click **Load unpacked**, and select the `dist/` folder.

### Use as a GitHub Template

```bash
gh repo create my-extension --template theluckystrike/chrome-extension-starter-mv3
cd my-extension
npm install
```

## Project Structure

```
src/
  background/index.ts     Service worker -- MV3 entry point, message handlers
  content/index.ts        Content script -- injected into pages, Shadow DOM UI
  lib/
    messaging.ts          Type-safe message passing between contexts
    storage.ts            chrome.storage wrapper (local, sync, session)
    types.ts              Shared TypeScript interfaces
```

## Build Commands

| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `npm run dev`            | Build in watch mode for development         |
| `npm run build`          | Production build                            |
| `npm run package`        | Production build + zip for Chrome Web Store |
| `npm test`               | Run Jest tests                              |
| `npm run test:watch`     | Run tests in watch mode                     |
| `npm run test:coverage`  | Run tests with coverage report              |
| `npm run lint`           | Run ESLint on all `.ts` and `.tsx` files    |
| `npm run lint:fix`       | Run ESLint with auto-fix                    |
| `npm run format`         | Format source files with Prettier           |
| `npm run type-check`     | Run TypeScript type checking (`tsc --noEmit`) |

## Usage

### Message Passing

Register handlers in the background service worker and send messages from popup or content scripts.

```typescript
// background/index.ts
import { initMessageListener, onMessage } from '../lib/messaging';

initMessageListener();

onMessage('GET_TAB_INFO', async (_payload, sender) => {
  return {
    tabId: sender.tab?.id,
    url: sender.tab?.url,
    title: sender.tab?.title,
  };
});

onMessage('PING', async () => {
  return { status: 'alive', timestamp: Date.now() };
});
```

```typescript
// popup or content script
import { sendMessage } from '../lib/messaging';

const response = await sendMessage('PING');
// response: { success: true, data: { status: 'alive', timestamp: ... } }
```

```typescript
// Send a message to a specific tab's content script
import { sendTabMessage } from '../lib/messaging';

const response = await sendTabMessage(tabId, 'GET_PAGE_INFO');
// response: { success: true, data: { title: '...', url: '...', description: '...' } }
```

### Storage

```typescript
import { storage, syncStorage } from '../lib/storage';

// Local storage
await storage.set('theme', 'dark');
const theme = await storage.get<string>('theme', 'light'); // 'dark'
await storage.remove('theme');

// Sync storage (syncs across devices)
await syncStorage.set('settings', { notifications: true });
const all = await syncStorage.getAll();

// Create a session-scoped storage instance
import { Storage } from '../lib/storage';
const sessionStorage = new Storage('session');
await sessionStorage.set('tempData', { foo: 'bar' });
await sessionStorage.clear();
```

### Shadow DOM Content Script UI

```typescript
// content/index.ts
import { injectShadowUI } from '../content/index';

const shadow = injectShadowUI(
  '<div class="widget">Hello from extension</div>',
  '.widget { padding: 16px; background: white; border-radius: 8px; }'
);
```

## API

### Messaging (`src/lib/messaging.ts`)

| Function | Signature | Description |
| --- | --- | --- |
| `initMessageListener` | `() => void` | Initialize the `chrome.runtime.onMessage` listener. Call once per context. |
| `onMessage` | `<TPayload, TResponse>(type: string, handler: (payload: TPayload, sender: MessageSender) => Promise<TResponse> \| TResponse) => void` | Register a handler for a message type. |
| `sendMessage` | `<TResponse, TPayload>(type: string, payload?: TPayload) => Promise<MessageResponse<TResponse>>` | Send a message to the background service worker. |
| `sendTabMessage` | `<TResponse, TPayload>(tabId: number, type: string, payload?: TPayload) => Promise<MessageResponse<TResponse>>` | Send a message to a specific tab's content script. |

### Storage (`src/lib/storage.ts`)

**`Storage` class** -- construct with `'local'`, `'sync'`, or `'session'`.

| Method | Signature | Description |
| --- | --- | --- |
| `get` | `<T>(key: string, defaultValue?: T) => Promise<T \| undefined>` | Get a value by key with optional default. |
| `set` | `<T>(key: string, value: T) => Promise<void>` | Set a value by key. |
| `remove` | `(key: string \| string[]) => Promise<void>` | Remove one or more keys. |
| `clear` | `() => Promise<void>` | Clear all data in the storage area. |
| `getAll` | `() => Promise<Record<string, unknown>>` | Get all key-value pairs. |

Pre-configured exports: `storage` (local) and `syncStorage` (sync).

### Content Script (`src/content/index.ts`)

| Function | Signature | Description |
| --- | --- | --- |
| `injectShadowUI` | `(html: string, css: string) => ShadowRoot` | Inject an isolated UI into the page using a closed Shadow DOM. |

### Types (`src/lib/types.ts`)

| Interface | Fields |
| --- | --- |
| `ExtensionConfig` | `name: string`, `version: string`, `storageArea: 'local' \| 'sync' \| 'session'` |
| `TabInfo` | `tabId?: number`, `url?: string`, `title?: string` |
| `PageInfo` | `title: string`, `url: string`, `description: string` |
| `StorageSchema` | `settings: Record<string, unknown>`, `data: Record<string, unknown>` |
| `Message<T>` | `type: string`, `payload?: T` |
| `MessageResponse<T>` | `success: boolean`, `data?: T`, `error?: string` |

## License

MIT
