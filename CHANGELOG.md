# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-06

### Added
- Initial release of Chrome Extension Starter MV3
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

### Project Structure
```
src/
  background/index.ts      Service worker entry point
  content/index.ts         Content script with Shadow DOM
  lib/
    messaging.ts           Type-safe message passing
    storage.ts             chrome.storage wrapper
    types.ts               Shared TypeScript interfaces
```

### Quick Start
```bash
git clone https://github.com/theluckystrike/chrome-extension-starter-mv3.git
cd chrome-extension-starter-mv3
npm install
npm run dev
```

Then load the extension in Chrome at chrome://extensions.

### Available Scripts
- `npm run dev` - Build and watch for changes
- `npm run build` - Production build
- `npm run package` - Create zip for Chrome Web Store
- `npm test` - Run Jest tests
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript type checking
