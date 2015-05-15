var GameAction = require('../actions/GameAction');
var utils = require('../common/utils');

module.exports = {

	getRankList: function() {
		$.ajax({
			url: '/gou/demo/api/game/rank.json',
			dataType: 'JSON',
			success: function(result) {
				result = utils.parse(result);
				if (result.success) {
					GameAction.receiveRankList(result.data);
				}
			}
		})
	}
}