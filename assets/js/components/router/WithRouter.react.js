var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

var About = React.createClass({
	render: function () {
	    return <h2>About</h2>;
	}
});

var Inbox = React.createClass({
	render: function () {
	    return <h2>Inbox</h2>;
	}
});

var Home = React.createClass({
	render: function () {
	    return <h2>Home</h2>;
	}
});

var Message = React.createClass({
	
	getInitialState: function() {
		return {id: ''}
	},

	componentDidMount: function() {
		var id = this.props.params.id;
		this.setState({
			id: id
		})
	},
	render: function() {
		return <h3>Message {this.state.id}</h3>;
	}
})

var App = React.createClass({
	render: function(){
		return (
			<div>
				<h1>App</h1>
				<RouteHandler />
			</div>
		)
	}
});


var routes = (
	<Route path="/" handler={App}>
		<DefaultRoute handler={Home} />
		<Route path="about" handler={About} />
		<Route path="inbox" handler={Inbox} >
			<Route path="messages/:id" handler={Message} />
		</Route>
	</Route>
);

Router.run(routes, Router.HashLocation, function(Handler) {
	React.render(<Handler />, document.body)
});