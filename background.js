
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed!");
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'generateResponse') {
      generateAPIResponse(request.message).then(apiResponse => {
        sendResponse(apiResponse); 
      });
      return true;
    }
  });
  async function generateAPIResponse(userMessage) {
    let prompt="You are a readme file code generator generate the readme file code for me. here are the description of my project use it and create the readme file code for github.";
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${prompt}. ${userMessage}` }]
        }
      ]
    };
  
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
  
    const data = await response.json();
    const apiResponse = data?.candidates[0]?.content?.parts[0]?.text || "Sorry Janu but i doesnot hear what u say";
    
    return apiResponse;
  }
  