var React = require('react');
var Header = require('./common/Header.react');
var Shops = require('./goodshop/Shops.react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var GoodShop = React.createClass({
	render: function() {
		return (
			<div className="module">
				<Header title="排行榜" href="/" />
				<RouteHandler />
			</div>
		)
	}
});

var routes = (
	<Route path="/" handler={GoodShop}>
		<DefaultRoute handler={Shops} />
		<Route path="/:id" handler={Shops} />
	</Route>
);

Router.run(routes, Router.HashLocation, function(Handler) {
	React.render(<Handler />, document.body)
});

