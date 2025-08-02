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

## Supported Sites

- **Glassdoor** - All international domains (.com, .co.uk, .de, .fr, etc.)
- **TeamBlind** - teamblind.com
- **Repvue** - repvue.com

## Installation

### Firefox (Manual)

1. Open Firefox and go to `about:debugging`
2. Click **"This Firefox"**
3. Click **"Load Temporary Add-on"**
4. Select the `manifest.json` file from this folder

### Firefox (Development)

#### Optional: Use a Custom Firefox Profile

If you want to use a specific Firefox profile for development:
1. Press <kbd>Win</kbd> + <kbd>R</kbd>, type `firefox.exe -P`, and press Enter.
2. Choose or create a profile and note its name.
3. Edit the `package.json` file in this folder:
   - Change `"default-release"` in the `dev` script to your chosen profile name:
     ```json
     "dev": "web-ext run --source-dir . --firefox-profile \"your-profile-name\""
     ```

#### Quick Start

1. Install [Node.js](https://nodejs.org/) if you don't have it.
2. Open a terminal in this folder.
3. Run the following commands:
   ```bash
   npm install
   npm run dev
   ```
This will launch Firefox with your extension loaded for development.

## Technical Details

- **Manifest Version**: 3 (Firefox compatible)
- **Permissions**: `activeTab` only
- **Architecture**: Content script + background script
- **Size**: Optimized for minimal footprint

## Credits

Forked and adapted from the original [Clear Glass extension](https://chromewebstore.google.com/detail/clear-glass/fbagenhjkcfdhjifnlcmgdmocbconfol?hl=en) available on the Chrome Web Store.
