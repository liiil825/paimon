var nodeExternals = require('webpack-node-externals');
var path = require('path')

module.exports = {
	entry: './main.ts',
	target: "async-node",
	externals: [nodeExternals()],
	// devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		library: 'main',
    libraryTarget: 'commonjs2',
	},
	resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
	module: {
		rules: [
				{
						use: 'ts-loader',
						test: /\.ts$/,
						exclude: /node_modules/,
				}
		]
	},
}