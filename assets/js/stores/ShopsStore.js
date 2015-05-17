var AppDispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/Constants'),
	EventEmitter = require('events').EventEmitter,
	assign = require('../common/object-assign');

var ActionTypes = Constants.GoodshopActionTypes;
var _shops = {};
var CHANGE_EVENT = 'change';

var ShopsStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll: function() {
		return _shops;
	}

});

ShopsStore.dispatcher = AppDispatcher.register(function(action) {

	switch (action.type) {
		case ActionTypes.RECEIVE_SHOPS:
			_shops = action.data;
			ShopsStore.emitChange();
			break;
	}
})

module.exports = ShopsStore;