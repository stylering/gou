var webpack = require('webpack'),
	bower_dir = __dirname + '/bower_components',
	path = require('path'),
	CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
	;


var config = {
	addVendor: function(name, path) {
		this.resolve.alias[name] = path;
		this.module.noParse.push(new RegExp('^' + name + '$'));
	},
	entry: {
		home: './assets/js/components/Home.react.js',
		game: './assets/js/components/Game.react.js',
		goodshop: './assets/js/components/Goodshop.react.js',
		'lib-commons': ['react', 'zepto', 'object-assign']
	},
	output: {
		path: __dirname + '/assets/build',
		filename: '[name].js'
	},
	plugins: [
		new CommonsChunkPlugin('lib-commons', 'lib-commons.js')
	],
	resolve: {
		alias: {}
    },
	module: {
		noParse: [],
		loaders: [
			{test: /\.js$/, loader: 'jsx-loader'},
			{test: /\.css$/, loader: 'style-loader!css-loader'}
		]
	}
};

config.addVendor('react', bower_dir + '/react/react.js');
config.addVendor('zepto', bower_dir + '/zepto/zepto.js');
config.addVendor('object-assign', './assets/js/common/object-assign.js');

module.exports = config;