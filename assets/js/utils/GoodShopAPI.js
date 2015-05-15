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

	getShops: function() {
		$.ajax({
			url: '/gou/demo/api/goodshop/index.json',
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