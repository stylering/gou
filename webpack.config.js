var webpack = require('webpack'),
	bower_dir = __dirname + '/bower_components',
	path = require('path'),
	CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
	;

var config = {
	addVendor: function(name, path) {
		this.resolve.alias[name] = path;
		this.module.noParse.push(new RegExp('^' + name + '$'));
		this.entry['lib-commons'].push(name);
	},
	entry: {
		home: './assets/js/components/Home.react.js',
		game: './assets/js/components/Game.react.js',
		goodshop: './assets/js/components/Goodshop.react.js',
		'lib-commons': []
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

// 公用框架与工具
config.addVendor('react', bower_dir + '/react/react.js');
config.addVendor('zepto', bower_dir + '/zepto/zepto.js');
config.addVendor('dispatcher', './assets/js/dispatcher/AppDispatcher.js');
config.addVendor('EventEmitter', './assets/js/common/EventEmitter.js');
config.addVendor('object-assign', './assets/js/common/object-assign.js');
config.addVendor('utils', './assets/js/common/utils.js');
config.addVendor('react-infinite-scroll', './assets/js/common/react-infinite-scroll.js');

// 公用react组件

module.exports = config;