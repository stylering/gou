var React = require('react');

var Toast = React.createClass({

	getDefaultProps: function() {
		msg: ''
	},

	componentDidUpdate: function() {
		var el = this.getDOMNode();
		el.style.display = 'block';
		setTimeout(function() {
			el.style.display = 'none';
		}, 5000);
	},

	render: function() {
		return (
			<div className="msg-tip">
				<span>{this.props.msg}</span>
			</div>
		);
	}

})

module.exports = Toast;