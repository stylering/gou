webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Header = __webpack_require__(5);
	var Tags = __webpack_require__(6);
	var Shops = __webpack_require__(7);

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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var TagsStore = __webpack_require__(10);
	var GoodShopAPI = __webpack_require__(23);

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ShopsStore = __webpack_require__(11);
	var GoodShopAPI = __webpack_require__(23);
	var InfiniteScroll = __webpack_require__(25)(React);

	GoodShopAPI.getShops();

	function getShops() {
		return {
			shops: ShopsStore.getAll()
		}
	}

	var Shops = React.createClass({displayName: "Shops",

		getInitialState: function() {
			return getShops();
		},

		render: function() {
			var i = 0;
			var loadFunc = function() {
				console.log(++i);
			}

			var shops = this.state.shops;

			return (
				React.createElement(InfiniteScroll, {
					pageStart: "0", 
					loadMore: loadFunc, 
					hasMore: true, 
					loader: React.createElement("div", {className: "loader"}, "loading...")}, 
				
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

		componentDidMount: function() {
			ShopsStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			ShopsStore.removeChangeListener(this._onChange);
		},

		_onChange: function() {
			this.setState(getShops());
		}
	})

	module.exports = Shops;

/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(14),
		Constants = __webpack_require__(15),
		EventEmitter = __webpack_require__(16).EventEmitter,
		assign = __webpack_require__(3);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(14),
		Constants = __webpack_require__(15),
		EventEmitter = __webpack_require__(16).EventEmitter,
		assign = __webpack_require__(3);

	var ActionTypes = Constants.GoodshopActionTypes;
	var _shops = [];
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
				_shops = _shops.concat(action.data.list);
				ShopsStore.emitChange();
				break;
		}
	})

	module.exports = ShopsStore;

/***/ },
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(20).Dispatcher;

	module.exports = new Dispatcher();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var keyMirror = __webpack_require__(19);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {

		parse: function (args) {
			try {
				return JSON.parse(args);
			} catch (e) {
				return args;
			}
		},

		stringify: function(args) {
			return JSON.stringify(args);
		}

	}

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(21)


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(22);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(18);
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

		getShops: function() {
			$.ajax({
				url: '/gou/demo/api/goodshop/index.json',
				dataType: 'JSON',
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(14),
		Constants = __webpack_require__(15)
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	function topPosition(domElt) {
	  if (!domElt) {
	    return 0;
	  }
	  return domElt.offsetTop + topPosition(domElt.offsetParent);
	}

	module.exports = function (React) {
	  if (React.addons && React.addons.InfiniteScroll) {
	    return React.addons.InfiniteScroll;
	  }
	  React.addons = React.addons || {};
	  var InfiniteScroll = React.addons.InfiniteScroll = React.createClass({displayName: "React.addons.InfiniteScroll",
	    getDefaultProps: function () {
	      return {
	        pageStart: 0,
	        hasMore: false,
	        loadMore: function () {},
	        threshold: 250
	      };
	    },
	    componentDidMount: function () {
	      this.pageLoaded = this.props.pageStart;
	      this.attachScrollListener();
	    },
	    componentDidUpdate: function () {
	      this.attachScrollListener();
	    },
	    render: function () {
	      var props = this.props;
	      return React.DOM.div(null, props.children, props.hasMore && (props.loader || InfiniteScroll._defaultLoader));
	    },
	    scrollListener: function () {
	      var el = this.getDOMNode();
	      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	      if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
	        this.detachScrollListener();
	        // call loadMore after detachScrollListener to allow
	        // for non-async loadMore functions
	        this.props.loadMore(this.pageLoaded += 1);
	      }
	    },
	    attachScrollListener: function () {
	      if (!this.props.hasMore) {
	        return;
	      }
	      window.addEventListener('scroll', this.scrollListener);
	      window.addEventListener('resize', this.scrollListener);
	      this.scrollListener();
	    },
	    detachScrollListener: function () {
	      window.removeEventListener('scroll', this.scrollListener);
	      window.removeEventListener('resize', this.scrollListener);
	    },
	    componentWillUnmount: function () {
	      this.detachScrollListener();
	    }
	  });
	  InfiniteScroll.setDefaultLoader = function (loader) {
	    InfiniteScroll._defaultLoader = loader;
	  };
	  return InfiniteScroll;
	};

/***/ }
]);