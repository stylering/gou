module.exports = {

	parse: function (args) {
		try {
			return JSON.parse(args);
		} catch (e) {
			return args;
		}
	},

	stringify: function(args) {
		return JSON.stringify(args);
	}

}