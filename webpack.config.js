const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devConfig = require("./config/webpack.dev.config");
const buildConfig = require("./config/webpack.build.config");

module.exports = (env, option) => {
	function progressHandler(percentage, message, ...args){
	};
	const baseConfig = {
		mode : option.mode,
		entry : {
			skydown : "./src/index.js"
		},
		output : {
			path : path.resolve(__dirname + "/dist"),
			library : "Skydown",
			libraryTarget : "umd",
			libraryExport : "default",
			auxiliaryComment : "umd comment"
		},
		module : {
			rules : [
				{
					test : /\.js$/,
					exclude : /node_modules/,
					use : {
						loader : "babel-loader"
					}
				},
				{
					test : /\.(scss|css)$/,
					use: [
						{
							loader : MiniCssExtractPlugin.loader,
							options : {
								publicPath : "../"
							}
						},
						"css-loader",
						"postcss-loader",
						"sass-loader"
					]
				},
				{
					test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					loader : "file-loader",
					options: {
						outputPath : "images",
						name : "[name].[ext]"
					}
				}
			]
		},
		plugins: [
			new webpack.ProgressPlugin(progressHandler),
			new webpack.DefinePlugin({
				"process.env" : {
					NODE_ENV : `"${option.mode}"`
				}
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions : {
					discardComments : {
						removeAll : true
					}
				}
			})
		],
		// optimization: {
		// 	splitChunks : {
		// 		cacheGroups : {
		// 			vendor : {
		// 				test : /[\\/]node_modules[\\/]/,
		// 				chunks : "all",
		// 				name : "vendor",
		// 				enforce : true,
		// 			},
		// 			styles : {
		// 				test : /\.css$/,
		// 				chunks : "all",
		// 				enforce : true
		// 			}
		// 		}
		// 	}
		// },
		resolve: {
			alias: {
				"@" : path.join(__dirname, "/src")
			},
			extensions: ["*", ".js", ".json"]
		}
	};
	return merge(baseConfig, option.mode === "production" ? buildConfig : devConfig);
};