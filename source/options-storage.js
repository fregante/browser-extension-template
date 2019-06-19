import OptionsSync from 'webext-options-sync';

const defaults = {
	logging: false
};

const options = new OptionsSync();

options.define({
	defaults,
	migrations: [
		OptionsSync.migrations.removeUnused
	]
});

export default options;
