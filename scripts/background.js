function closeSenderTab(sender) {
  if (sender && sender.tab && sender.tab.id !== undefined) {
    chrome.tabs.remove(sender.tab.id);
  }
}

function handleMessage(request, sender) {
  if (!request || request.closeWebPage !== true) {
    return;
  }

  if (request.isSuccess === true) {
    /* Set username */
    chrome.storage.local.set({ leethub_username: request.username });

    /* Set token */
    chrome.storage.local.set({ leethub_token: request.token });

    /* Close pipe */
    chrome.storage.local.set({ pipe_leethub: false }, () => {
      console.log('Closed pipe.');
    });

    closeSenderTab(sender);

    /* Go to onboarding for UX */
    const urlOnboarding = chrome.runtime.getURL('welcome.html');
    chrome.tabs.create({ url: urlOnboarding, active: true }); // creates new tab
  } else if (
    request &&
    request.closeWebPage === true &&
    request.isSuccess === false
  ) {
    console.error(
      'Something went wrong while trying to authenticate your profile!',
    );
    closeSenderTab(sender);
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
