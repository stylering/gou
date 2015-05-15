var AppDispatcher = require('../dispatcher/AppDispatcher'),
	Constants = require('../constants/Constants'),
	EventEmitter = require('events').EventEmitter,
	assign = require('../common/object-assign');

var ActionTypes = Constants.GoodshopActionTypes;
var _Tags = [];
var CHANGE_EVENT = 'change';

var TagsStore = assign({}, EventEmitter.prototype, {

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
		return _Tags;
	}

});

TagsStore.dispatcher = AppDispatcher.register(function(action) {

	switch (action.type) {
		case ActionTypes.RECEIVE_TAGS:
			_Tags = action.data.list;
			TagsStore.emitChange();
			break;
	}
})

module.exports = TagsStore;