const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function injectResource(html){
	let h = html.toString();
	h = h.replace(/\t|\n/g, "");
	// h = h.replace("</head>", `<link href="style/skydown.css" rel="stylesheet"></head>`);
	h = h.replace("</body>", `<script src="js/skydown.js"></script></body>`);
	return h;
};

module.exports = {
	output : {
		filename : "js/[name].js"
	},
	plugins : [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template : "./index.html",
			filename : "./index.html",
			inject : true
		}),
		new MiniCssExtractPlugin({
			filename : "style/[name].css"
		})
	],
	// devServer : {
	// 	host : "localhost",
	// 	port : 8080,
	// 	compress : true,
	// 	before(app, server){
	// 		app.get("/", (req, res) => {
	// 			fs.readFile(path.join(__dirname, "../index.html"), "utf8", (err, data) => {
	// 				res.send(injectResource(data));
	// 			});
	// 		});
	// 	}
	// }
};