// eslint-disable-next-line import/no-unassigned-import
import "./options-storage.js";
import { getSettings } from "./options-storage.js";

// Initialize on first installation
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	if (reason === "install") {
		await getSettings(); // Initialize default settings
	}
});

// Handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "openOptions") {
		chrome.runtime.openOptionsPage();
	}
});
