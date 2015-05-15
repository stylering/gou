var AppDispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/Constants.js')
	;

var ActionTypes = Constants.GameActionTypes;

module.exports = {
	receiveRankList: function(rankList) {

		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_RANK_LIST,
			data: rankList
		})

	}
}