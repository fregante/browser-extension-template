// eslint-disable-next-line import/no-unassigned-import
import 'webext-base-css';
import './options.css';

// Don't forget to import this wherever you use it
import browser from 'webextension-polyfill';

import optionsStorage from './options-storage';

const rangeInputs = document.querySelectorAll<HTMLInputElement>('input[type="range"][name^="color"]')
const numberInputs = document.querySelectorAll<HTMLInputElement>('input[type="number"][name^="color"]')
const output = document.querySelector('.color-output') as HTMLElement;

function updateOutputColor(){ 

	output.style.backgroundColor = `rgb(${rangeInputs[0].value}, ${rangeInputs[1].value}, ${rangeInputs[2].value})`;
}

function updateInputField(event) {
	const rangeInputsIndexing=[...rangeInputs]
	numberInputs[rangeInputsIndexing.indexOf(event.currentTarget)].value = event.currentTarget.value;
}

for (const input of rangeInputs) {
	input.addEventListener('input', updateOutputColor);
	input.addEventListener('input', updateInputField);
}

async function init() {
	await optionsStorage.syncForm('#options-form');
	updateOutputColor();
}

init();
