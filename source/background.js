const repoUrl = 'https://github.com/notlmn/browser-extension-template';

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		url: repoUrl
	});
});

browser.runtime.onInstalled.addListener(async ({reason}) => {
	// Only notify on install
	if (reason === 'install') {
		const self = await browser.management.getSelf();
		if (self && self.installType === 'development') {
			return;
		}

		browser.tabs.create({
			url: repoUrl
		});
	}
});
