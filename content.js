// Content script for Get Prankd extension
class PrankManager {
  constructor() {
    this.currentMode = 'off';
    this.keyMap = new Map();
    this.wordReplacements = new Map();
    this.isActive = false;
    
    this.init();
  }
  
  async init() {
    // Get initial mode from storage
    try {
      const result = await chrome.storage.sync.get(['prankMode']);
      this.currentMode = result.prankMode || 'off';
    } catch (error) {
      console.log('Could not access storage:', error);
    }
    
    // Generate random key mappings for violation mode
    this.generateKeyMap();
    
    // Generate word replacements for mild mode
    this.generateWordReplacements();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Listen for mode changes from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'changePrankMode') {
        this.currentMode = request.mode;
        console.log('Prank mode changed to:', this.currentMode);
      }
    });
  }
  
  generateKeyMap() {
    // All alphanumeric characters
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charArray = chars.split('');
    
    // Create a shuffled copy for mapping
    const shuffled = [...charArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Create mapping
    this.keyMap.clear();
    charArray.forEach((char, index) => {
      this.keyMap.set(char, shuffled[index]);
    });
  }
  
  generateWordReplacements() {
    const commonWords = [
      'the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but',
      'his', 'from', 'they', 'she', 'her', 'been', 'than', 'its', 'who', 'did'
    ];
    
    const replacementWords = [
      'potato', 'banana', 'unicorn', 'pickle', 'wizard', 'llama', 'cheese', 'ninja',
      'robot', 'dragon', 'muffin', 'sparkle', 'rubber', 'duck', 'pancake', 'zombie',
      'rainbow', 'penguin', 'bubble', 'taco'
    ];
    
    this.wordReplacements.clear();
    commonWords.forEach(word => {
      const randomReplacement = replacementWords[Math.floor(Math.random() * replacementWords.length)];
      this.wordReplacements.set(word, randomReplacement);
    });
  }
  
  setupEventListeners() {
    // Handle input events for mild mode (word replacement)
    document.addEventListener('input', (e) => {
      if (this.currentMode === 'mild' && this.isTextInput(e.target)) {
        this.handleMildMode(e);
      }
    });
    
    // Handle keypress events for violation mode (key remapping)
    document.addEventListener('keypress', (e) => {
      if (this.currentMode === 'violation' && this.isTextInput(e.target)) {
        this.handleViolationMode(e);
      }
    });
    
    // Re-generate mappings periodically to keep things unpredictable
    setInterval(() => {
      if (this.currentMode === 'violation') {
        this.generateKeyMap();
      }
      if (this.currentMode === 'mild') {
        this.generateWordReplacements();
      }
    }, 30000); // Every 30 seconds
  }
  
  isTextInput(element) {
    const textInputTypes = ['text', 'email', 'password', 'search', 'url', 'tel'];
    
    return (
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'INPUT' && textInputTypes.includes(element.type) ||
      element.isContentEditable ||
      element.getAttribute('contenteditable') === 'true'
    );
  }
  
  handleMildMode(event) {
    const target = event.target;
    let value = target.value || target.textContent;
    
    // Check if the last typed word matches any in our replacement map
    const words = value.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (this.wordReplacements.has(lastWord.toLowerCase())) {
      const replacement = this.wordReplacements.get(lastWord.toLowerCase());
      
      // Replace the word
      words[words.length - 1] = replacement;
      const newValue = words.join(' ');
      
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
        const cursorPos = target.selectionStart;
        target.value = newValue;
        // Restore cursor position
        target.setSelectionRange(cursorPos + (replacement.length - lastWord.length), cursorPos + (replacement.length - lastWord.length));
      } else {
        target.textContent = newValue;
      }
    }
  }
  
  handleViolationMode(event) {
    const char = event.key;
    
    // Only remap alphanumeric characters
    if (this.keyMap.has(char)) {
      event.preventDefault();
      
      const mappedChar = this.keyMap.get(char);
      const target = event.target;
      
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
        // For regular input fields
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;
        
        target.value = value.substring(0, start) + mappedChar + value.substring(end);
        target.setSelectionRange(start + 1, start + 1);
      } else if (target.isContentEditable || target.getAttribute('contenteditable') === 'true') {
        // For contenteditable elements
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        
        range.deleteContents();
        const textNode = document.createTextNode(mappedChar);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
}

// Initialize the prank manager when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PrankManager();
  });
} else {
  new PrankManager();
}