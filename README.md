# 🎭 Get Prankd - Chrome Extension

A mischievous Chrome extension designed to prank users with two levels of keyboard interference.

## Features

### 🔹 Mildly Infuriating Mode
- Randomly replaces common words as you type in any text field
- Words like "the", "and", "you" get replaced with silly alternatives like "potato", "unicorn", "taco"
- Replacement mappings change every 30 seconds to keep things unpredictable

### 🔥 Outright Violation Mode  
- Completely remaps all alphanumeric keys to random other alphanumeric keys
- Like an unsolvable Enigma machine for your keyboard
- Key mappings shuffle every 30 seconds for maximum chaos
- Makes typing nearly impossible

## Installation

1. **Download the Extension**
   - Clone or download this repository to your local machine

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Get Prankd" and click the pin icon to keep it visible

## Usage

1. **Access the Extension**
   - Click the Get Prankd icon in your Chrome toolbar
   - A popup will appear with three mode options

2. **Select a Mode**
   - **Off**: Normal typing behavior (default)
   - **Mildly Infuriating**: Random word replacements
   - **Outright Violation**: Complete key remapping chaos

3. **Start Pranking**
   - Navigate to any website with text input fields
   - Start typing to see the effects
   - The extension works on all text inputs, textareas, and contenteditable elements

## How It Works

- **Content Script**: Intercepts keyboard events on all web pages
- **Popup Interface**: Provides easy mode switching
- **Background Script**: Manages extension state and communication
- **Smart Detection**: Only affects actual text input areas, not shortcuts or navigation

## Files Structure

```
get-prankd/
├── manifest.json       # Extension configuration
├── popup.html         # User interface popup
├── popup.js          # Popup logic and mode switching
├── content.js        # Main pranking logic
├── background.js     # Extension state management
└── README.md        # This file
```

## Technical Notes

- Uses Manifest V3 for modern Chrome compatibility
- Requires no special permissions beyond active tab access
- Word replacements and key mappings regenerate every 30 seconds
- Works on all websites and web applications
- Minimal performance impact

## Customization

You can easily customize the prank behavior by editing `content.js`:

- **Word Replacements**: Modify the `commonWords` and `replacementWords` arrays
- **Timing**: Change the `setInterval` duration (currently 30 seconds)
- **Key Mapping**: Adjust the characters included in the remapping

## Disclaimer

This extension is for entertainment purposes only. Please use responsibly and don't install it on someone's computer without their knowledge or consent. The authors are not responsible for any productivity loss, frustration, or broken keyboards resulting from use of this extension.

## Contributing

Feel free to submit issues or pull requests to improve the pranking experience!

## License

This project is open source. Use it, modify it, and spread the chaos responsibly! 🎭