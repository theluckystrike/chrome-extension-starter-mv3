# Chrome Extension Starter -- Manifest V3

[![CI](https://github.com/theluckystrike/chrome-extension-starter-mv3/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-extension-starter-mv3/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![MV3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/)

Production-ready Chrome Extension template with TypeScript, React 18, Tailwind CSS, Webpack 5, and Manifest V3. Includes type-safe message passing, a `chrome.storage` wrapper, Jest testing, ESLint + Prettier, and GitHub Actions CI.

## Quick Start

```bash
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git my-extension
cd my-extension
npm install
npm run dev
```

Then load in Chrome: open `chrome://extensions`, enable Developer Mode, click "Load unpacked", and select the `dist/` folder.

## Project Structure

```
src/
  background/index.ts     Service worker (MV3 entry point)
  content/index.ts        Content script injected into pages
  lib/
    messaging.ts          Type-safe message passing (sendMessage, onMessage)
    storage.ts            chrome.storage wrapper (local, sync, session)
    types.ts              Shared TypeScript interfaces
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build + watch for changes |
| `npm run build` | Production build |
| `npm run package` | Create `.zip` for Chrome Web Store |
| `npm test` | Run Jest tests |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm run type-check` | TypeScript type check |

## Customization

1. **Update `manifest.json`** -- Set your extension name, description, icons, and permissions.
2. **Add popup UI** -- Create React components in `src/popup/`. Webpack builds `popup.html` automatically.
3. **Add options page** -- Create `src/options/` with your settings UI.
4. **Register message handlers** -- Use `onMessage()` in the service worker and `sendMessage()` from popup/content scripts.
5. **Configure storage** -- Import `storage` or `syncStorage` from `src/lib/storage.ts` for type-safe key-value persistence.

## Built-in Utilities

### Message Passing

```typescript
// background/index.ts
import { initMessageListener, onMessage } from '../lib/messaging';
initMessageListener();
onMessage('GET_DATA', async (payload) => {
  return { items: ['a', 'b'] };
});

// popup or content script
import { sendMessage } from '../lib/messaging';
const response = await sendMessage('GET_DATA');
```

### Storage

```typescript
import { storage, syncStorage } from '../lib/storage';

await storage.set('theme', 'dark');
const theme = await storage.get<string>('theme', 'light');
await syncStorage.set('settings', { notifications: true });
```

## Related

- [crx-permission-analyzer](https://github.com/theluckystrike/crx-permission-analyzer) -- Analyze Chrome extension permissions
- [crx-manifest-validator](https://github.com/theluckystrike/crx-manifest-validator) -- Validate manifest.json files
- [crx-extension-size-analyzer](https://github.com/theluckystrike/crx-extension-size-analyzer) -- Analyze extension bundle size

## License

MIT -- [Zovo](https://zovo.one)
