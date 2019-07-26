# browser-extension-template

[link-webext-polyfill]: https://github.com/mozilla/webextension-polyfill
[link-rgh]: https://github.com/sindresorhus/refined-github
[link-ngh]: https://github.com/sindresorhus/notifier-for-github
[link-hfog]: https://github.com/sindresorhus/hide-files-on-github
[link-tsconfig]: https://github.com/sindresorhus/tsconfig
[link-xo-ts]: https://github.com/xojs/eslint-config-xo-typescript
[link-dcs]: https://github.com/fregante/webext-dynamic-content-scripts
[link-options-sync]: https://github.com/fregante/webext-options-sync
[link-cws-keys]: https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md
[link-amo-keys]: https://addons.mozilla.org/en-US/developers/addon/api/key

> A template for creating cross-browser browser extensions

![Sample extension output](media/previewer.png)

## Features
- Cross-browser builds using [webextension-polyfill][link-webext-polyfill].
- [Auto-syncing options](#auto-syncing-options).
- [Auto-publishing](#publishing) with auto-versioning and support for manual releases.
- [Extensive configuration documentation](#configuration).

This extension template is heavily inspired from [refined-github][link-rgh], [notifier-for-github][link-ngh], and [hide-files-on-github][link-hfog] browser extensions. You can always refer to these browser extensions' source code if you find anything confusing on how to create a new extension.

## How to use this template

Click <kbd>Use this template</kbd> and make a copy of your own. 😉

## Configuration

The extension doesn't target any specific ECMAScript environment or provide any transpiling by default. The extensions output will be the same ECMAScript you write. This allows us to always target the latest browser version, which is a good practice you should be following.

### Webpack

#### Transpiling using Babel

The template bakes in a pretty basic webpack config, with no transpiling. To setup transpiling using Babel follow the following configuration steps.

1. Install Babel packages and respective loader for webpack.

	``` sh
	npm i --save-dev @babel/core @babel/preset-env babel-loader
	```
1. In `webpack.config.js`, add the following rule to process JS files.

	``` js
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
	```
1. Target respective browsers using `.babelrc`.

	``` json
	{
		"presets": [
			["@babel/preset-env", {
				"targets": {
					"chrome": "74",
					"firefox": "67"
				}
			}]
		]
	}
	```

#### Extracting CSS

If you will be writing any code that will be importing CSS files from JS files, then you will be needing `mini-css-extract-plugin` to extract this imported CSS into its own file.

1. Install the webpack plugin.

	``` sh
	npm i --save-dev mini-css-extract-plugin
	```
1. Modify the webpack config as mentioned to let this plugin handle CSS imports.

	``` js
	// Import plugin
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');

	// Under `module.rules`
	{
		test: /\.css$/,
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader'
		]
	}

	// Under `plugins`
	new MiniCssExtractPlugin({
		filename: 'features.css'
	})
	```

#### TypeScript

TypeScript and Babel configs conflict each other, so you can only use one of these configuration types at any point.

1. Install TypeScript and respective loader for webpack

	``` sh
	npm i --save-dev typescript ts-loader @types/firefox-webext-browser
	```
1. Use the following webpack rule in the config file.

	``` js
	{
		test: /\.(js|ts|tsx)$/,
		loader: 'ts-loader',
		exclude: /node_modules/
	},
	```

1. Use the following as `tsconfig.json`, uses [sindresorhus/tsconfig][link-tsconfig] (install it as dependecy before using).

	``` json
	{
		"extends": "@sindresorhus/tsconfig",
		"compilerOptions": {
			"target": "esnext",
			"declaration": false
		},
		"include": [
			"source"
		]
	}
	```

TypeScript requires additional configuration depending on how you set it up, like [linting][link-xo-ts].

### Contentscripts

Contentscripts are CSS and JS code that you inject into each tab of the browser. Instead of manually using the API to tell the browser to inject these scripts, you could use [fregante/webext-dynamic-content-scripts][link-dcs] to automatically do this.

### Auto-syncing options

The options page includes [fregante/webext-options-sync][link-options-sync] that syncs all input values includes in the form element as they change. These changes are reflected across all the browser instances for the extension if you are logged into the browser using Google account on Chrome or Firefox account on Firefox.

Refer to the Node modules documentation for more info on how it works.

### Publishing

It's possible to publish to both the Chrome Web Store and Mozilla Addons at once by creating these ENV variables:

1. `CLIENT_ID`, `CLIENT_SECRET`, and `REFRESH_TOKEN` from [Google APIs][link-cws-keys].
1. `WEB_EXT_API_KEY`, and `WEB_EXT_API_SECRET` from [AMO][link-amo-keys].

And then running:

``` sh
npm run release
```

This will:

1. Build the extension
1. Create a version number based on the current UTC time, like [`19.6.16.428`](https://github.com/LinusU/utc-version#utc-version) and sets it in the manifest.json
1. Deploy it to both stores

#### Auto-publishing

Thanks to the included [Travis file](.travis.yml), if you set up those ENVs on Travis, the deployment will automatically happen:

- when clicking ["Trigger build"](https://blog.travis-ci.com/2017-08-24-trigger-custom-build)
- every day, if you configure the [Cron Job](https://docs.travis-ci.com/user/cron-jobs/) (but only if there are any new commits in the last day)

#### Auto-publishing on tags

If you prefer picking your versions and publishing on demand, replace the deployment in [Travis file](.travis.yml) with:

``` yml
  - provider: script
    skip_cleanup: true
    script: npm run release
    on:
      tags: true
```

And then replace the `prerelease:version` script in [package.json](package.json) with:

``` json
"prerelease:version": "dot-json distribution/manifest.json version $TRAVIS_TAG",
```

And your extension will be published when creating a git tag, using the tag itself as version for the extension.

### License

This browser extension template is released under [MIT](#license) and mentioned below. There is no `license` file included in here, but when you clone this template, you should include your own license file for the specific license you choose to use.

### Tests

I know, everyone has their own opinion on this one. To keep it simple, copy-paste tests and their configuration from the extension projects mentioned at the start of this document. End of story.

## Credits

Extension icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0).

## Extensions created using this template

- [notlmn/copy-as-markdown](https://github.com/notlmn/copy-as-markdown) - Browser extension to copy hyperlinks, images, and selected text as Markdown.

## License

This template is released under the MIT License by [Laxman](https://github.com/notlmn).
