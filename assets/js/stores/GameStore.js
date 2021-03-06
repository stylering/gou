var AppDispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/Constants'),
	EventEmitter = require('events').EventEmitter,
	assign = require('../common/object-assign');

var ActionTypes = Constants.GameActionTypes;
var _rankList = [];
var CHANGE_EVENT = 'change';

var GameStore = assign({}, EventEmitter.prototype, {

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
		return _rankList;
	}

});

GameStore.dispatcher = AppDispatcher.register(function(action) {

	switch (action.type) {
		case ActionTypes.RECEIVE_RANK_LIST:
			_rankList = action.data.list;
			GameStore.emitChange();
			break;
	}
})

module.exports = GameStore;