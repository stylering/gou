webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1),
		zepto = __webpack_require__(2),
		Rank = __webpack_require__(12)
		;

	React.render(
		React.createElement(Rank, null),
		$('body')[0]
	)

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
		;

	var Header = React.createClass({displayName: "Header",
		render: function() {
			return (
				React.createElement("header", {id: "iHeader", className: "hd"}, 
					React.createElement("div", {className: "top-wrap"}, 
						React.createElement("div", {className: "title"}, 
							React.createElement("a", {href: this.props.href, className: "back"}), 
							React.createElement("h1", null, this.props.title)
						)
					)
				)
			)
		}
	});

	module.exports = Header;

/***/ },
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1),
		Header = __webpack_require__(9),
		RankTop = __webpack_require__(19),
		RankList = __webpack_require__(20);

	var Rank = React.createClass({displayName: "Rank",

		render: function() {
			return (
				React.createElement("div", {className: "module"}, 
					React.createElement(Header, {title: "排行榜", href: "/"}), 
					React.createElement("section", {className: "layout-center"}, 
						React.createElement(RankTop, null)
					), 
					React.createElement("section", {className: "layout-center"}, 
						React.createElement(RankList, null)
					)
				)
			)
		}
	})

	module.exports = Rank;

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
		;

	var RankTop = React.createClass({displayName: "RankTop",
		render: function() {
			return (
				React.createElement("div", {className: "cut-rank-top"}, 
					React.createElement("div", {className: "inner"}, 
						React.createElement("span", {className: "period"}, "第5期："), 
						React.createElement("h2", null, "韩国QQ牌拉杆箱14寸灰色"), 
						React.createElement("div", {className: "date"}, 
							React.createElement("div", {className: "timer"}), 
							React.createElement("span", null, "今天10:00-18:00")
						)
					)
				)
			)
		}
	})

	module.exports = RankTop;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
		GameAPI = __webpack_require__(24),
		GameStore = __webpack_require__(25);

	GameAPI.getRankList();

	var EllipsisItem = React.createClass({displayName: "EllipsisItem",
		render: function() {
			return (
				React.createElement("li", {className: "item ellipsis-text"}, 
					React.createElement("span", null), 
					React.createElement("span", null), 
					React.createElement("span", null)
				)
			)
		}
	});

	var Item = React.createClass({displayName: "Item",

		render: function() {

			var dataList = this.props.dataList,
				statusClass = 'item',
				current = '',
				rank = this.props.dataList.rank,
				expend = this.props.dataList.expend;

			if (dataList['win']) {
				statusClass = 'item win';
				rank = React.createElement("span", {className: "cup"});
				expend = React.createElement("span", {className: "strong"}, this.props.dataList.expend);
			} else if (dataList['current']) {
				statusClass = 'item current';
				current = React.createElement("div", {className: "circle-text"}, "您在此");
			}

			return (
				React.createElement("li", {className: statusClass}, 
					current, 
					React.createElement("ul", null, 
						React.createElement("li", null, rank), 
						React.createElement("li", null, this.props.dataList.name), 
						React.createElement("li", null, expend)
					)
				)
			)
		}
	})

	function getRankList() {
		return {
			rankList: GameStore.getAll()
		}
	}

	function getRankItem (list) {
		if (list['ellipsis-text']) {
			return (
				React.createElement(EllipsisItem, null)
			)
		}

		return (
			React.createElement(Item, {dataList: list})
		)
	}

	var RankList = React.createClass({displayName: "RankList",

		getInitialState: function() {
			return getRankList();
		},

		componentDidMount: function() {
			GameStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			GameStore.removeChangeListener(this._onChange);
		},

		render: function() {
			var rankItems = this.state.rankList.map(getRankItem);
			return (
				React.createElement("ul", {className: "cut-rank-list"}, 
					rankItems
				)
			)
		},

		_onChange: function() {
			this.setState(getRankList());
		}
	})

	module.exports = RankList;

/***/ },
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var GameAction = __webpack_require__(31);
	var utils = __webpack_require__(6)(React);

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

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(28),
		EventEmitter = __webpack_require__(14).EventEmitter,
		assign = __webpack_require__(5);

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

/***/ },
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var keyMirror = __webpack_require__(32);

	module.exports = {

		GameActionTypes: keyMirror({
		  RECEIVE_RANK_LIST: null
		}),

		GoodshopActionTypes: keyMirror({
			RECEIVE_TAGS: null,
			RECEIVE_SHOPS: null
		}),

	}

/***/ },
/* 29 */,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(28)
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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;

/***/ }
]);