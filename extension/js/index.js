document.getElementById("logInButton").onclick = function () {
  console.log("Sending message to open login window.");
  chrome.runtime.sendMessage("open_login_window", (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      console.log("Response:", response);
    }
  });
};
