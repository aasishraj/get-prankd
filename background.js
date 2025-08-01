// Background script for Get Prankd extension
chrome.runtime.onInstalled.addListener(() => {
  // Set default mode to 'off' when extension is installed
  chrome.storage.sync.set({ prankMode: 'off' });
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPrankMode') {
    chrome.storage.sync.get(['prankMode']).then((result) => {
      sendResponse({ mode: result.prankMode || 'off' });
    });
    return true; // Keep message channel open for async response
  }
});

// Update extension icon based on mode (optional enhancement)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.prankMode && namespace === 'sync') {
    const newMode = changes.prankMode.newValue;
    
    // You could change the extension icon based on the mode
    // For now, we'll just log the mode change
    console.log('Prank mode changed to:', newMode);
  }
});