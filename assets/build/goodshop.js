webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Header = __webpack_require__(9);
	var Shops = __webpack_require__(10);
	var Router = __webpack_require__(8);
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;

	var GoodShop = React.createClass({displayName: "GoodShop",
		render: function() {
			return (
				React.createElement("div", {className: "module"}, 
					React.createElement(Header, {title: "排行榜", href: "/"}), 
					React.createElement(RouteHandler, null)
				)
			)
		}
	});

	var routes = (
		React.createElement(Route, {path: "/", handler: GoodShop}, 
			React.createElement(DefaultRoute, {handler: Shops}), 
			React.createElement(Route, {path: "/:id", handler: Shops})
		)
	);

	Router.run(routes, Router.HashLocation, function(Handler) {
		React.render(React.createElement(Handler, null), document.body)
	});



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
	var Tags = __webpack_require__(16);
	var ShopList = __webpack_require__(17);

	var Shops = React.createClass({displayName: "Shops",

		render: function() {
			var hashId = this.props.params.id || '';
			return (
				React.createElement("div", {className: "layout-center"}, 
					React.createElement(Tags, {id: hashId}), 
					React.createElement(ShopList, {id: hashId})
				)
			)
		}
	})

	module.exports = Shops;

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var TagsStore = __webpack_require__(33);
	var GoodShopAPI = __webpack_require__(23);

	GoodShopAPI.getTags();

	function getTags() {
		return {
			tags: TagsStore.getAll(),
		}
	}

	var Tags = React.createClass({displayName: "Tags",

		getInitialState: function() {
			return getTags();
		},

		render: function() {
			var id = this.props.id;
			return (
				React.createElement("div", {className: "slide-tab-box"}, 
					React.createElement("ul", {id: "J_slideTab", className: "slide-tab"}, 
						React.createElement("li", {className:  id==''? 'active' : ''}, React.createElement("a", {href: "#/"}, "全部")), 
						this.state.tags.map(function(tag) {
							return React.createElement("li", {className:  tag.id == id ? 'active' : ''}, React.createElement("a", {href: '#'+tag.id}, tag.name))
						})
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ShopsStore = __webpack_require__(22);
	var GoodShopAPI = __webpack_require__(23);
	var InfiniteScroll = __webpack_require__(7)(React);

	function getShopsFromServer(args) {
		GoodShopAPI.getShops(args);
	}

	var ShopItem = React.createClass({displayName: "ShopItem",

		render: function() {
			var item = this.props.shopItem;
			return (
				React.createElement("div", {className: "goodshop"}, 
					React.createElement("i", {className: "serial ico-serial"}, item.num), 
					React.createElement("div", {className: "cont"}, 
						React.createElement("div", {className: "header"}, 
							React.createElement("div", {className: "logo"}, 
								React.createElement("img", {src: item.logo})
							), 
							React.createElement("a", {href: item.url, className: "intro"}, 
								React.createElement("h2", null, item.title), 
								React.createElement("p", null)
							), 
							React.createElement("div", {className: "aside J_aside"})
						), 
						React.createElement("a", {href: item.url}, 
							React.createElement("ul", {className: "pics"}, 
								React.createElement("li", null, React.createElement("img", {src: item.goods[0]})), 
								React.createElement("li", null, React.createElement("img", {src: item.goods[1]})), 
								React.createElement("li", null, React.createElement("img", {src: item.goods[2]}))
							)
						)
					)
				)
			)
		}
	});

	var ShopItems = React.createClass({displayName: "ShopItems",
		render: function() {
			var shopList = this.props.shopList;
			return (
				React.createElement("div", null, 
					shopList.map(function(shop, index){
						return React.createElement(ShopItem, {key: index, shopItem: shop})
					})
				)
			)
		}
	});


	var ShopList = React.createClass({displayName: "ShopList",

		getInitialState: function() {
			// var id = this.props.id;
			// getShopsFromServer({id: id});
			return {
				hasnext: true,
				shopList: []
			}
		},

		componentDidMount: function() {
			ShopsStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			ShopsStore.removeChangeListener(this._onChange);
		},

		componentWillReceiveProps: function(nextProps) {
			if (this.props.id != nextProps.id) {
				this.state.shopList = [];
				this.state.page = 1;
				getShopsFromServer({
					id: nextProps.id, 
					page: this.state.page
				});
			}
		},

		render: function() {
			return (
				React.createElement(InfiniteScroll, {
					loadMore: this._loadMore, 
					hasnext: this.state.hasnext, 
					page: this.state.page}, 
					React.createElement(ShopItems, {shopList: this.state.shopList})
				)
			)
		},

		_loadMore: function() {
			var id = this.props.id;
			var page = this.state.page = (this.state.page || 0) + 1;
			getShopsFromServer({
				id: id, 
				page: page
			});
		},

		_onChange: function() {
			this.setState(this._getShopsFromStore());
		},

		_getShopsFromStore: function() {
			var data = ShopsStore.getAll();
			var list = [];
			var hasnext = false;

			if (data.list) list = data.list;
			if (data.hasnext) hasnext = true;

			list = this.state.shopList.concat(list);
			return {
				shopList: list,
				hasnext: hasnext
			}
		}
	})

	module.exports = ShopList;

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(28),
		EventEmitter = __webpack_require__(14).EventEmitter,
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var utils = __webpack_require__(6)(React);
	var GoodshopAction = __webpack_require__(29);

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
				page: args.page || 1,
				tag_id:  args.id || '',
				uid: ''
			};
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
/* 24 */,
/* 25 */,
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(28)
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
/* 30 */,
/* 31 */,
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

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(3),
		Constants = __webpack_require__(28),
		EventEmitter = __webpack_require__(14).EventEmitter,
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

/***/ }
]);