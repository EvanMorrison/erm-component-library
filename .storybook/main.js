const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	core: {
		builder: 'storybook-builder-vite'
	},
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
	framework: '@storybook/svelte',
	svelteOptions: {
		preprocess: import('../svelte.config.js').preprocess
	},
	webpackFinal: async (config) => {
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				svelte: path.resolve(__dirname, '..', 'node_modules', 'svelte')
			},
			mainFields: ['svelte', 'browser', 'module', 'main']
		};

		config.module.rules.push({
			resolve: {
				fullySpecified: false,
				extensions: ['.js', '.ts']
			}
		});

		return config;
	}
};
