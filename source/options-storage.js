// Template type definition
const defaultTemplates = [
	{
		title: "Sample Template",
		content:
			"You are an intelligent programmer, powered by Claude 3.5 Sonnet. You are happy to help answer any questions that the user has (usually they will be about coding). You will be given the context of the code in their file(s), your conversation history with them, and potentially relevant blocks of code.",
	},
];

const defaultSettings = {
	templates: defaultTemplates,
	useCtrlEnterToSend: true,
};

// Helper functions for storage operations
export async function getSettings() {
	const result = await chrome.storage.sync.get();
	return { ...defaultSettings, ...result };
}

export async function saveSettings(settings) {
	await chrome.storage.sync.set(settings);
}

// Template management functions
export async function addTemplate(title, content) {
	const settings = await getSettings();
	settings.templates.push({ title, content });
	await saveSettings(settings);
}

export async function deleteTemplate(index) {
	const settings = await getSettings();
	settings.templates.splice(index, 1);
	await saveSettings(settings);
}
