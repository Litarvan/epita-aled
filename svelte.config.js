import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: 'body'
	},
	preprocess: preprocess({
		replace: [
			// TODO: Fix first build not working
			[/import '\//g, "import '/src/"],
			[/from '\//g, "from '/src/"]
		],
		sourceMap: true,
		scss: {
			renderSync: true,
			includePaths: ['src/styles']
		}
	})
};

export default config;
