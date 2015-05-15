var utils = require('../common/utils');
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
			page: 1,
			tag_id: '',
			uid: ''
		};
		$.extend(params, args);
		params = $.param(params);
		$.ajax({
			url: '/gou/demo/api/goodshop/index.json?' + params,
			type: 'GET',
			// data: params,
			dataType: 'JSON',
			success: function(result) {
				result = utils.parse(result);
				if (result.success) {
					GoodshopAction.receiveShops(result.data);
				}
			}
		})
	}
}