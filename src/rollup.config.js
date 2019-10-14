import { uglify } from 'rollup-plugin-uglify';

export default [
	{
		input: 'js/user-list.js',
		output: {
			file: '../webroot/js/user-list.js',
			format: 'iife'
		}
	},
	{
		input: 'js/login.js',
		output: {
			file: '../webroot/js/login.js',
			format: 'iife'
		},
		plugins: [ uglify() ]
	}
];