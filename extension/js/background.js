chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
