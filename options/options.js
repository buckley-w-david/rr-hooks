const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const followInput = document.querySelector("#follow");
const favInput = document.querySelector("#fav");
const rilInput = document.querySelector("#ril");

/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {
  browser.storage.local.set({
    auth: {
      username: usernameInput.value,
      password: passwordInput.value
    },
    hooks: {
        follow: followInput.value.trim().split("\n"),
        favorite: favInput.value.trim().split("\n"),
        ril: rilInput.value.trim().split("\n"),
    }
  });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  usernameInput.value = restoredSettings.auth.username || "";
  passwordInput.value = restoredSettings.auth.password || "";
  followInput.value = restoredSettings.hooks.follow?.join("\n") || "";
  favInput.value = restoredSettings.hooks.favorite?.join("\n") || "";
  rilInput.value = restoredSettings.hooks.ril?.join("\n") || "";
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On blur, save the currently selected settings.
*/
usernameInput.addEventListener("blur", storeSettings);
passwordInput.addEventListener("blur", storeSettings);
followInput.addEventListener("blur", storeSettings);
favInput.addEventListener("blur", storeSettings);
rilInput.addEventListener("blur", storeSettings);
