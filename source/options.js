import { getSettings, saveSettings } from "./options-storage.js";

// Display template list
async function renderTemplates() {
	const container = document.getElementById("templates-container");
	const settings = await getSettings();

	container.innerHTML = settings.templates
		.map(
			(template, index) => `
    <div class="template-item">
      <div class="template-title">${template.title}</div>
      <div class="template-content">${template.content}</div>
      <div class="template-actions">
        <button type="button" class="delete-button" data-index="${index}">Delete</button>
      </div>
    </div>
  `,
		)
		.join("");
}

// Add new template
document.addEventListener("DOMContentLoaded", async () => {
	await renderTemplates();

	// Add form submit handler
	document
		.getElementById("options-form")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const title = document.getElementById("template-title").value;
			const content = document.getElementById("template-content").value;

			const settings = await getSettings();
			settings.templates.push({ title, content });
			await saveSettings(settings);

			// Reset form and update list
			e.target.reset();
			await renderTemplates();
		});

	// Add delete button handler
	document
		.getElementById("templates-container")
		.addEventListener("click", async (e) => {
			if (e.target.classList.contains("delete-button")) {
				const index = parseInt(e.target.dataset.index, 10);
				const settings = await getSettings();
				settings.templates.splice(index, 1);
				await saveSettings(settings);
				await renderTemplates();
			}
		});
});
