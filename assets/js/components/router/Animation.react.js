var React = require('react');
var Router = require('react-router');
var Transition = require('../../../../bower_components/react-router/build/lib/Transition');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
	render: function() {
		return (
			<div>
				<ul>
					<li><Link to="page1">page 1</Link></li>
					<li><Link to="page2">page 2</Link></li>
				</ul>
				<RouteHandler key={name} />
			</div>
		)
	}
});


var Page1 = React.createClass({
  render: function () {
    return (
      <div className="Image">
        <h1>Page 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
});

var Page2 = React.createClass({
  render: function () {
    return (
      <div className="Image">
        <h1>Page 2</h1>
        <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
});

var routes = (
	<Route handler={App}>
		<Route name="page1" handler={Page1} />
		<Route name="page2" handler={Page2} />
	</Route>
);

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.body);
})