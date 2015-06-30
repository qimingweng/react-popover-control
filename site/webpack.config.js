var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticRenderWebpackPlugin = require('static-render-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});

var IS_DEV = process.env.NODE_ENV == 'development';

var routes = [
	'/'
];

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0'},
			{test: /\.(png|jpg)$/, loader: 'url?limit=8096'},
			{test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss!sass?sourceMap')}
		]
	},
	resolve: {
		alias: {
			react: __dirname + '/node_modules/react'
		}
	},
	devServer: {
	  port: 9000
	},
	devtool: IS_DEV ? 'cheap-module-source-map' : undefined,
	postcss: function() {
	  return [autoprefixer];
  },
	plugins: [
		definePlugin,
		new ExtractTextPlugin('style.css'),
		new StaticRenderWebpackPlugin('bundle.js', routes)
	]
}