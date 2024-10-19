document.getElementById('sendMessage').addEventListener('click', () => {
    const userMessage = document.getElementById('userInput').value;
  
    // Send a message to the background script to handle the API call
    chrome.runtime.sendMessage({ type: 'generateResponse', message: userMessage }, (response) => {
      // Once the background script sends the response, display it on the screen
      document.getElementById('response').innerText = response;
    });
  });
  