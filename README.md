# Chrome Extension Starter Template — Manifest V3

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MV3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/)

> **Built by [Zovo](https://zovo.one)** — makers of 18+ production Chrome extensions including [Tab Suspender Pro](https://chrome.google.com/webstore/detail/tab-suspender-pro), [JSON Formatter Pro](https://chrome.google.com/webstore/detail/json-formatter-pro), and [Cookie Manager Pro](https://chrome.google.com/webstore/detail/cookie-manager-pro).

The **fastest way to build a production-ready Chrome extension** with TypeScript, React, and Tailwind CSS on Manifest V3. Skip the boilerplate and start shipping.

## ✨ What's Included

| Feature | Details |
|---------|---------|
| 🔷 **TypeScript** | Full type safety with strict mode |
| ⚛️ **React 18** | Modern UI components with hooks |
| 🎨 **Tailwind CSS** | Utility-first styling, zero config |
| 📦 **Webpack 5** | Optimized bundling with HMR |
| 🔐 **Manifest V3** | Service worker, declarativeNetRequest ready |
| 💬 **Message Passing** | Type-safe messaging between contexts |
| 💾 **Storage Wrapper** | Generic get/set with `chrome.storage` |
| 🧪 **Jest + Testing** | Unit testing with JSDOM |
| 🔍 **ESLint + Prettier** | Code quality and formatting |
| 🚀 **CI/CD** | GitHub Actions for test + build |
| 📝 **Store Templates** | Listing and privacy policy templates |

## 🚀 Quick Start

```bash
# Clone this template
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git my-extension
cd my-extension

# Install dependencies
npm install

# Start development (with file watching)
npm run dev

# Load in Chrome:
# 1. Open chrome://extensions
# 2. Enable "Developer Mode"
# 3. Click "Load unpacked"
# 4. Select the dist/ folder
```

## 📁 Project Structure

```
src/
├── background/          # Service worker (MV3)
│   └── index.ts
├── content/             # Content scripts (injected into pages)
│   └── index.ts
├── popup/               # Extension popup UI
│   ├── App.tsx
│   └── components/
├── options/             # Options/settings page
├── lib/                 # Shared utilities
│   ├── storage.ts       # Chrome storage wrapper
│   ├── messaging.ts     # Type-safe message passing
│   └── types.ts         # Shared TypeScript types
└── onboarding/          # Welcome page for new users
```

## 🛠 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build + watch for changes |
| `npm run build` | Production build |
| `npm run package` | Create `.zip` for Chrome Web Store |
| `npm test` | Run Jest tests |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm run type-check` | TypeScript type check |

## 💾 Storage API

```typescript
import { storage } from './lib/storage';

// Type-safe get/set
await storage.set('theme', 'dark');
const theme = await storage.get<string>('theme', 'light');

// Sync storage
import { syncStorage } from './lib/storage';
await syncStorage.set('settings', { notifications: true });
```

## 💬 Message Passing

```typescript
// In background service worker
import { onMessage, initMessageListener } from './lib/messaging';

initMessageListener();
onMessage('GET_DATA', async (payload) => {
  return { items: await fetchItems() };
});

// In popup or content script
import { sendMessage } from './lib/messaging';
const response = await sendMessage('GET_DATA');
```

## 📦 Extensions Built With This Template

These production extensions were built using this boilerplate:

- 🔄 [Tab Suspender Pro](https://chrome.google.com/webstore/detail/tab-suspender-pro) — Save memory by suspending inactive tabs
- 📋 [JSON Formatter Pro](https://chrome.google.com/webstore/detail/json-formatter-pro) — Format, validate & beautify JSON
- 🍪 [Cookie Manager Pro](https://chrome.google.com/webstore/detail/cookie-manager-pro) — View, edit & manage cookies
- 📝 [Text Expander Pro](https://chrome.google.com/webstore/detail/text-expander-pro) — Smart text expansion
- 📎 [Clipboard History Pro](https://chrome.google.com/webstore/detail/clipboard-history-pro) — Never lose copied text

## 🔗 Related Tools

- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) — Enhanced Chrome storage wrapper
- [mv3-migrate](https://github.com/theluckystrike/mv3-migrate) — Migrate MV2 extensions to MV3
- [tab-manager-api](https://github.com/theluckystrike/tab-manager-api) — Chrome tabs API wrapper
- [json-toolkit-cli](https://github.com/theluckystrike/json-toolkit-cli) — JSON CLI toolkit

## 📄 License

MIT — [Zovo](https://zovo.one)
