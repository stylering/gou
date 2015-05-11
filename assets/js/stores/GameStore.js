var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('../common/object-assign');


var GameStore = assign({}, EventEmitter.prototype, {

	getRankList: function() {
		return {kk: '121212'}
	}

});

module.exports = GameStore;