import OptionsSync from 'webext-options-sync';

const defaults = {
	colorRed: 244,
	colorGreen: 67,
	colorBlue: 54
};

const options = new OptionsSync({
	logging: true
});

options.define({
	defaults,
	migrations: [
		OptionsSync.migrations.removeUnused
	]
});

export default options;
