webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Header = __webpack_require__(9);
	var Tags = __webpack_require__(10);
	var Shops = __webpack_require__(11);

	var GoodShop = React.createClass({displayName: "GoodShop",
		render: function() {
			return (
				React.createElement("div", {className: "module"}, 
					React.createElement(Header, {title: "排行榜", href: "/"}), 
					React.createElement("section", {className: "layout-center"}, 
						React.createElement(Tags, null)
					), 
					React.createElement("section", {className: "layout-center"}, 
						React.createElement(Shops, null)
					)
				)
			)
		}
	})

	React.render(
		React.createElement(GoodShop, null),
		document.getElementsByTagName('body')[0]
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var TagsStore = __webpack_require__(16);
	var GoodShopAPI = __webpack_require__(17);

	GoodShopAPI.getTags();

	function getTags() {
		return {
			tags: TagsStore.getAll()
		}
	}

	function tagsIterator(tag) {
		return (
			React.createElement(Tag, {tag: tag})
		)
	}

	var Tag = React.createClass({displayName: "Tag",
		render: function() {
			return (
				React.createElement("li", null, React.createElement("a", {href: "javascipt:void(0);"}, this.props.tag))
			)
		}
	});

	var Tags = React.createClass({displayName: "Tags",

		getInitialState: function() {
			return getTags();
		},

		render: function() {
			var tags = this.state.tags.map(tagsIterator);
			return (
				React.createElement("div", {className: "slide-tab-box"}, 
					React.createElement("ul", {id: "J_slideTab", className: "slide-tab"}, 
						tags
					)
				)
			)
		},

		componentDidMount: function() {
			TagsStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			TagsStore.removeChangeListener(this._onChange);
		},

		_onChange: function() {
			this.setState(getTags());
		}
	})

	module.exports = Tags;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ShopsStore = __webpack_require__(18);
	var GoodShopAPI = __webpack_require__(17);
	var InfiniteScroll = __webpack_require__(7)(React);
	var Toast = __webpack_require__(19);

	// page: 1,
	// uid: ''
	// tag_id: '',
	function getShopsFromServer(args) {
		GoodShopAPI.getShops(args);
	}

	// getShopsFromServer();

	function getShops() {
		var shops = ShopsStore.getAll();
		return {
			shops: shops.list,
			hasnext: shops.hasnext,
			page: shops.curpage
		}
	}

	var Shops = React.createClass({displayName: "Shops",

		getInitialState: function() {
			getShops();
			return {
				shops: [],
				hasnext: true,
				page: 0
			}
		},

		loadMore: function() {
			getShopsFromServer({
				page: this.state.page + 1
			})
		},

		componentDidMount: function() {
			ShopsStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			ShopsStore.removeChangeListener(this._onChange);
		},

		render: function() {
			var i = 0;
			var shops = this.state.shops;
			return (
				React.createElement(InfiniteScroll, {
					threshold: "10", 
					loadMore: this.loadMore, 
					hasnext: this.state.hasnext
					// loading={<div className="msg-tip"><span>努力加载中...</span></div>}
					}, 
					shops.map(function(shop){
						return (
							React.createElement("div", {className: "goodshop"}, 
								React.createElement("i", {className: "serial ico-serial"}, shop.num), 
								React.createElement("div", {className: "cont"}, 
									React.createElement("div", {className: "header"}, 
										React.createElement("div", {className: "logo"}, 
											React.createElement("img", {src: shop.logo})
										), 
										React.createElement("a", {href: shop.url, className: "intro"}, 
											React.createElement("h2", null, shop.title), 
											React.createElement("p", null)
										), 
										React.createElement("div", {className: "aside J_aside"})
									), 
									React.createElement("a", {href: shop.url}, 
										React.createElement("ul", {className: "pics"}, 
											React.createElement("li", null, React.createElement("img", {src: shop.goods[0]})), 
											React.createElement("li", null, React.createElement("img", {src: shop.goods[1]})), 
											React.createElement("li", null, React.createElement("img", {src: shop.goods[2]}))
										)
									)
								)
							)
						)
					})
				)
			)
		},

		_onChange: function() {
			var data = getShops();
			this.setState({
				shops: this.state.shops.concat(data.shops),
				hasnext: data.hasnext,
				page: data.page
			})
		}
	})

	module.exports = Shops;

/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(23),
		EventEmitter = __webpack_require__(12).EventEmitter,
		assign = __webpack_require__(5);

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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var utils = __webpack_require__(6)(React);
	var GoodshopAction = __webpack_require__(24);

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
				url: '/gou/demo/api/goodshop/index.php?' + params,
				type: 'GET',
				// data: params,
				// dataType: 'JSON',
				success: function(result) {
					result = utils.parse(result);
					if (result.success) {
						GoodshopAction.receiveShops(result.data);
					}
				}
			})
		}
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(23),
		EventEmitter = __webpack_require__(12).EventEmitter,
		assign = __webpack_require__(5);

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

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var keyMirror = __webpack_require__(27);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(23)
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

/***/ },
/* 25 */,
/* 26 */,
/* 27 */
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