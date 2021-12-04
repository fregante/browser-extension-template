import optionsStorage from './options-storage.js';

async function init () {

	const options = await optionsStorage.getAll();
	const color = "rgb(" + options.colorRed + ", " + options.colorGreen + "," + options.colorBlue + ")";
	const text = options.text;

	const warning = document.createElement("div");

	warning.innerHTML = text;
	document.body.appendChild(warning);
	warning.id = "text-warning";
	warning.style.border = "2px solid " + color;
	warning.style.color = color;
}

init();