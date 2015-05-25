var React = require('react');

var Toast = React.createClass({

	getInitialState: function() {
		return {
			open: this.props.isOpen || false
		}
	},

	/*componentDidUpdate: function(prevProps, prevState) {
		if (this.props.isOpen) {
		console.log('11111')
			this._hide();
		}
	},*/

	componentDidMount: function() {
		this._hide();
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			msg: nextProps.msg,
			open: nextProps.isOpen
		});
		this._hide()
	},

	render: function() {
		var styles;
		styles = this.state.open ? {'display': 'block'} : {'display': 'none'};
		return (
			<div style={styles} className="msg-tip">
				<span>{this.props.msg}</span>
			</div>
		);
	},

	_show: function() {
		this.setState({
			open: true
		})
	},

	_hide: function() {
		var that = this;
		var timer = setTimeout(function() {
			that.setState({
				open: false
			});
			clearTimeout(timer);
		}, 5000);
	}

})

module.exports = Toast;