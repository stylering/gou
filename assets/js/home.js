var React = require('react'),
	zepto = require('zepto')
	;

var Home = React.createClass({
	render: function() {
		return (
			<div>ddddd</div>
		)
	}
});


React.render(
	<Home />,
	$('.module')[0]
)


module.exports = Home;