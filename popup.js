// Popup script for managing extension modes
document.addEventListener('DOMContentLoaded', async () => {
  // Load current mode from storage
  const result = await chrome.storage.sync.get(['prankMode']);
  const currentMode = result.prankMode || 'off';
  
  // Set the radio button for current mode
  document.getElementById(currentMode).checked = true;
  updateStatus(currentMode);
  
  // Add event listeners to radio buttons
  const radioButtons = document.querySelectorAll('input[name="mode"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', async (e) => {
      const newMode = e.target.value;
      
      // Save mode to storage
      await chrome.storage.sync.set({ prankMode: newMode });
      
      // Update status display
      updateStatus(newMode);
      
      // Send message to content script in current tab
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { 
          action: 'changePrankMode', 
          mode: newMode 
        });
      } catch (error) {
        console.log('Content script not ready or tab not accessible:', error);
      }
    });
  });
});

function updateStatus(mode) {
  const statusText = document.getElementById('status-text');
  
  switch (mode) {
    case 'off':
      statusText.textContent = 'Inactive';
      statusText.className = 'inactive';
      break;
    case 'mild':
      statusText.textContent = 'Mildly Infuriating Active';
      statusText.className = 'active';
      break;
    case 'violation':
      statusText.textContent = 'Outright Violation Active';
      statusText.className = 'active';
      break;
  }
}