import optionsStorage from './options-storage.js';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
	const options = await optionsStorage.getAll();
	const color = 'rgb(' + options.colorRed + ', ' + options.colorGreen + ',' + options.colorBlue + ')';
	const text = options.text;
	const notice = document.createElement('div');
	notice.innerHTML = text;
	document.body.prepend(notice);
	notice.id = 'text-notice';
	notice.style.border = '2px solid ' + color;
	notice.style.color = color;
}

init();
