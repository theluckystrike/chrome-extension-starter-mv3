# Chrome Extension Starter MV3

A clean, production-ready starter template for building Chrome extensions with Manifest V3, TypeScript, React 18, Tailwind CSS, and Webpack 5.

Clone it, install, and start building. Everything is wired up and ready to go.


WHAT IS INCLUDED

- Manifest V3 service worker background script with lifecycle hooks
- Content script with Shadow DOM injection for isolated page UI
- Type-safe message passing between background, popup, and content scripts
- Typed chrome.storage wrapper supporting local, sync, and session areas
- React 18 with JSX support for popup and options pages
- Tailwind CSS with PostCSS and Autoprefixer
- Webpack 5 with dev watch mode and optimized production builds
- Jest testing pre-configured with ts-jest and jsdom
- ESLint and Prettier for consistent code style
- GitHub Actions CI running type checks and tests on Node 18 and 20
- TypeScript in strict mode throughout


QUICK START

```bash
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git my-extension
cd my-extension
npm install
npm run dev
```

Then open chrome://extensions, turn on Developer Mode, click Load unpacked, and select the dist/ folder.

You can also use the GitHub template feature directly:

```bash
gh repo create my-extension --template theluckystrike/chrome-extension-starter-mv3
cd my-extension
npm install
```


PROJECT STRUCTURE

```
src/
  background/index.ts      Service worker entry point, message handlers, lifecycle events
  content/index.ts          Content script injected into pages, Shadow DOM UI helper
  lib/
    messaging.ts            Type-safe message passing between extension contexts
    storage.ts              chrome.storage wrapper with local, sync, and session support
    types.ts                Shared TypeScript interfaces
```


AVAILABLE SCRIPTS

```
npm run dev              Build and watch for changes during development
npm run build            Production build
npm run package          Production build and zip for Chrome Web Store upload
npm test                 Run Jest tests
npm run test:watch       Run tests in watch mode
npm run test:coverage    Run tests with coverage report
npm run lint             Lint all .ts and .tsx files
npm run lint:fix         Lint with auto-fix
npm run format           Format source files with Prettier
npm run type-check       Run TypeScript type checking without emitting
```


HOW TO USE THE TEMPLATE

Message passing

Register handlers in the background service worker and send messages from any other context.

```typescript
// background/index.ts
import { initMessageListener, onMessage } from '../lib/messaging';

initMessageListener();

onMessage('PING', async () => {
  return { status: 'alive', timestamp: Date.now() };
});
```

```typescript
// popup or content script
import { sendMessage } from '../lib/messaging';

const response = await sendMessage('PING');
```

You can also send messages directly to a tab's content script using sendTabMessage.

Storage

The Storage class wraps chrome.storage with typed get and set methods.

```typescript
import { storage, syncStorage } from '../lib/storage';

await storage.set('theme', 'dark');
const theme = await storage.get<string>('theme', 'light');

await syncStorage.set('settings', { notifications: true });
```

You can create instances for any storage area by passing 'local', 'sync', or 'session' to the constructor.

Shadow DOM injection

The content script exports an injectShadowUI function that creates a closed Shadow DOM element on the page. This keeps your extension UI completely isolated from the host page styles.

```typescript
import { injectShadowUI } from '../content/index';

const shadow = injectShadowUI(
  '<div class="widget">Hello from extension</div>',
  '.widget { padding: 16px; background: white; border-radius: 8px; }'
);
```


BUILDING AND LOADING THE EXTENSION

1. Run npm run build to create a production build in the dist/ folder
2. Open chrome://extensions in your browser
3. Enable Developer Mode using the toggle in the top right
4. Click Load unpacked and select the dist/ folder
5. The extension is now active

To package for the Chrome Web Store, run npm run package. This creates an extension.zip file in the project root.


TECH STACK

- TypeScript 5.x with strict mode
- React 18
- Tailwind CSS 3.x
- Webpack 5
- Jest 29
- ESLint 8 with TypeScript plugin
- Prettier 3
- GitHub Actions for CI


LICENSE

MIT. See the LICENSE file for details.


ABOUT

Built and maintained by theluckystrike. This starter template is part of the Chrome extension tooling from zovo.one, a studio focused on building practical browser extensions and developer tools.

https://github.com/theluckystrike/chrome-extension-starter-mv3
