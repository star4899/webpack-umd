const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	output : {
		filename : "js/[name].[chunkhash].js"
	},
	plugins : [
		new HtmlWebpackPlugin({
			template : "./index.html",
			filename : "./index.html",
			minify : {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			},
			inject : true
		}),
		new MiniCssExtractPlugin({
			filename : "style/[name].[chunkhash].css"
		})
	]
};