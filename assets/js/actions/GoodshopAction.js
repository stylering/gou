var AppDispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/Constants.js')
	;

var ActionTypes = Constants.GoodshopActionTypes;

module.exports = {
	
	receiveTags: function(tags) {

		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_TAGS,
			data: tags
		})
	},

	receiveShops: function(shops) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_SHOPS,
			data: shops
		})

	}
}