document.getElementById("logInButton").onclick = function () {
  window.close();
  chrome.runtime.sendMessage("open_login_window", (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      console.log("Response:", response);
    }
  });
};
