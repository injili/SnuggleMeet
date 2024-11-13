console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);
  if (message === "open_login_window") {
    chrome.windows.create(
      {
        url: "http://localhost:5173/",
        type: "popup",
        width: 500,
        height: 500,
      },
      (win) => {
        console.log("New window opened:", win.id);
        sendResponse({ status: "success", windowId: win.id });
      }
    );
  }
  return true;
});
