# Chrome Extension Starter -- Manifest V3

[![npm version](https://img.shields.io/npm/v/chrome-extension-starter-mv3)](https://npmjs.com/package/chrome-extension-starter-mv3)
[![CI](https://github.com/theluckystrike/chrome-extension-starter-mv3/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-extension-starter-mv3/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![MV3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-extension-starter-mv3?style=social)](https://github.com/theluckystrike/chrome-extension-starter-mv3)

> Production-ready Chrome Extension template with TypeScript, React 18, Tailwind CSS, Webpack 5, and Manifest V3.

## Overview

**Chrome Extension Starter** is a production-ready template for building modern Chrome extensions with Manifest V3. Includes type-safe message passing, a `chrome.storage` wrapper, Jest testing, ESLint + Prettier, and GitHub Actions CI.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **TypeScript** - Full type safety throughout
- ✅ **React 18** - Modern UI development
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Webpack 5** - Fast builds with HMR
- ✅ **Manifest V3** - Service workers and modern APIs
- ✅ **Type-Safe Messaging** - Built-in message passing
- ✅ **Storage Wrapper** - Easy chrome.storage with types
- ✅ **Testing** - Jest configured and ready
- ✅ **CI/CD** - GitHub Actions workflow included

## Quick Start

```bash
# Clone the template
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git my-extension
cd my-extension

# Install dependencies
npm install

# Start development
npm run dev
```

Then load in Chrome: open `chrome://extensions`, enable Developer Mode, click "Load unpacked", and select the `dist/` folder.

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git
cd chrome-extension-starter-mv3

# Install dependencies
npm install

# Build for development
npm run dev

# Build for production
npm run build
```

### As a Template

```bash
# Use with GitHub CLI
gh repo create my-extension --template theluckystrike/chrome-extension-starter-mv3
cd my-extension
npm install
```

## Project Structure

```
src/
  background/index.ts     Service worker (MV3 entry point)
  content/index.ts        Content script injected into pages
  popup/                  Extension popup UI (React)
  options/                Options page
  lib/
    messaging.ts          Type-safe message passing (sendMessage, onMessage)
    storage.ts            chrome.storage wrapper (local, sync, session)
    types.ts              Shared TypeScript interfaces
public/
  manifest.json           Extension manifest
  icons/                  Extension icons
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

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build in watch mode |
| `npm run build` | Production build |
| `npm run package` | Create Chrome Web Store zip |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run type-check` | Type check |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/extension-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/extension-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [crx-permission-analyzer](https://github.com/theluckystrike/crx-permission-analyzer) - Analyze Chrome extension permissions
- [crx-manifest-validator](https://github.com/theluckystrike/crx-manifest-validator) - Validate manifest.json files
- [crx-extension-size-analyzer](https://github.com/theluckystrike/crx-extension-size-analyzer) - Analyze extension bundle size
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper
- [webext-bridge](https://github.com/theluckystrike/webext-bridge) - Cross-context messaging
- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Privacy-first extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
