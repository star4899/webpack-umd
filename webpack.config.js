"use strict"
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, option) => {
	const config = {
		mode : option.mode,
		entry : "./src/index.js",
		output : {
			path : path.resolve(__dirname + "/dist"),
			filename : "skydown.js",
			library : "skydown",
			libraryTarget : "umd",
			auxiliaryComment: 'skydown comment'
		},
		module : {},
		plugins: [
			new HtmlWebpackPlugin({
				template : "./index.html",
				filename : "./index.html",
				inject : true
			})
		],
		optimization: {
			minimize : false
		}
	};
	return config
};