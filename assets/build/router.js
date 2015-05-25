webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	// require('./router/WithoutRouter.react');
	// require('./router/WithRouter.react');
	__webpack_require__(11);

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Router = __webpack_require__(8);
	var Transition = __webpack_require__(18);
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Link = Router.Link;

	var App = React.createClass({displayName: "App",
		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement("ul", null, 
						React.createElement("li", null, React.createElement(Link, {to: "page1"}, "page 1")), 
						React.createElement("li", null, React.createElement(Link, {to: "page2"}, "page 2"))
					), 
					React.createElement(RouteHandler, {key: name})
				)
			)
		}
	});


	var Page1 = React.createClass({displayName: "Page1",
	  render: function () {
	    return (
	      React.createElement("div", {className: "Image"}, 
	        React.createElement("h1", null, "Page 1"), 
	        React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
	      )
	    );
	  }
	});

	var Page2 = React.createClass({displayName: "Page2",
	  render: function () {
	    return (
	      React.createElement("div", {className: "Image"}, 
	        React.createElement("h1", null, "Page 2"), 
	        React.createElement("p", null, "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
	      )
	    );
	  }
	});

	var routes = (
		React.createElement(Route, {handler: App}, 
			React.createElement(Route, {name: "page1", handler: Page1}), 
			React.createElement(Route, {name: "page2", handler: Page2})
		)
	);

	Router.run(routes, function(Handler) {
		React.render(React.createElement(Handler, null), document.body);
	})

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W058 */

	'use strict';

	var Cancellation = __webpack_require__(26);
	var Redirect = __webpack_require__(27);

	/**
	 * Encapsulates a transition to a given path.
	 *
	 * The willTransitionTo and willTransitionFrom handlers receive
	 * an instance of this class as their first argument.
	 */
	function Transition(path, retry) {
	  this.path = path;
	  this.abortReason = null;
	  // TODO: Change this to router.retryTransition(transition)
	  this.retry = retry.bind(this);
	}

	Transition.prototype.abort = function (reason) {
	  if (this.abortReason == null) this.abortReason = reason || 'ABORT';
	};

	Transition.prototype.redirect = function (to, params, query) {
	  this.abort(new Redirect(to, params, query));
	};

	Transition.prototype.cancel = function () {
	  this.abort(new Cancellation());
	};

	Transition.from = function (transition, routes, components, callback) {
	  routes.reduce(function (callback, route, index) {
	    return function (error) {
	      if (error || transition.abortReason) {
	        callback(error);
	      } else if (route.onLeave) {
	        try {
	          route.onLeave(transition, components[index], callback);

	          // If there is no callback in the argument list, call it automatically.
	          if (route.onLeave.length < 3) callback();
	        } catch (e) {
	          callback(e);
	        }
	      } else {
	        callback();
	      }
	    };
	  }, callback)();
	};

	Transition.to = function (transition, routes, params, query, callback) {
	  routes.reduceRight(function (callback, route) {
	    return function (error) {
	      if (error || transition.abortReason) {
	        callback(error);
	      } else if (route.onEnter) {
	        try {
	          route.onEnter(transition, params, query, callback);

	          // If there is no callback in the argument list, call it automatically.
	          if (route.onEnter.length < 4) callback();
	        } catch (e) {
	          callback(e);
	        }
	      } else {
	        callback();
	      }
	    };
	  }, callback)();
	};

	module.exports = Transition;

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Represents a cancellation caused by navigating away
	 * before the previous transition has fully resolved.
	 */
	"use strict";

	function Cancellation() {}

	module.exports = Cancellation;

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Encapsulates a redirect to the given route.
	 */
	"use strict";

	function Redirect(to, params, query) {
	  this.to = to;
	  this.params = params;
	  this.query = query;
	}

	module.exports = Redirect;

/***/ }

});