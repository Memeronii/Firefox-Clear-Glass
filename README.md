# Clear Glass Firefox Extension

A Firefox port of the popular [Clear Glass Chrome Extension](https://chromewebstore.google.com/detail/clear-glass/fbagenhjkcfdhjifnlcmgdmocbconfol?hl=en) that removes obstructions from top job review sites.

## About

This extension is adapted from the original Chrome Web Store extension to work natively with Firefox. It removes annoying paywalls, signup prompts, and other blocking elements from Glassdoor, TeamBlind, and Repvue.

## Features

- 🚫 Hides blocking overlays and signup prompts
- 📜 Enables unrestricted scrolling
- 👁️ Shows full review text without "Show More" buttons
- 🔢 Displays count of blocked elements in browser badge
- 🌍 Works on all international Glassdoor domains

## Installation

### Firefox (Manual)

1. Open Firefox and go to `about:debugging`
2. Click **"This Firefox"**
3. Click **"Load Temporary Add-on"**
4. Select the `manifest.json` file from this folder

### Firefox (Development)

```bash
npm install
npx web-ext run
```

## Supported Sites

- **Glassdoor** - All international domains (.com, .co.uk, .de, .fr, etc.)
- **TeamBlind** - teamblind.com
- **Repvue** - repvue.com

## Technical Details

- **Manifest Version**: 3 (Firefox compatible)
- **Permissions**: `activeTab` only
- **Architecture**: Content script + background script
- **Size**: Optimized for minimal footprint

## Credits

Forked and adapted from the original [Clear Glass extension](https://chromewebstore.google.com/detail/clear-glass/fbagenhjkcfdhjifnlcmgdmocbconfol?hl=en) available on the Chrome Web Store.
