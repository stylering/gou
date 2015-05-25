var React = require('react');
var utils = require('../common/utils')(React);
var GoodshopAction = require('../actions/GoodShopAction');

module.exports = {

	getTags: function() {
		$.ajax({
			url: '/gou/demo/api/goodshop/tag.json',
			dataType: 'JSON',
			success: function(result) {
				result = utils.parse(result);
				if (result.success) {
					GoodshopAction.receiveTags(result.data);
				}
			}
		})
	},

	getShops: function(args) {
		args = args || {}
		var params = {
			page: args.page || 1,
			tag_id:  args.id || '',
			uid: ''
		};
		params = $.param(params);
		$.ajax({
			url: '/gou/demo/api/goodshop/index.php?' + params,
			type: 'GET',
			// data: params,
			// dataType: 'JSON',
			success: function(result) {
				result = utils.parse(result);
				if (result.success) {
					GoodshopAction.receiveShops(result.data);
				}
			}
		})
	}
}