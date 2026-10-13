
# Universal AI Cost Overview

A local-first tool for estimating AI prompt token usage and cost.

## Features

- Browser-based prompt token estimation
- Configurable example model prices
- Local storage of token and cost estimates
- Reusable JavaScript cost engine
- Chrome Manifest V3 extension

## Run the browser extension

1. Open Google Chrome.
2. Visit chrome://extensions.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select the apps/extension folder.
6. Open a supported AI website and type a prompt.

## Test the cost engine

Requirements: Node.js with ES module and node:test support.

Open a terminal in packages/cost-engine and run:

npm test

## Privacy

Prompt text is processed locally by the extension. The extension stores
only the latest token and cost estimate in Chrome local storage.

## Limitations

Token counts are heuristic estimates, not exact model tokenization.
Example prices must be replaced with verified current rates.
Website UI changes may require updating prompt field detection.