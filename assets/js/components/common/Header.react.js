var React = require('react')
	;

var Header = React.createClass({
	render: function() {
		return (
			<header id="iHeader" className="hd">
				<div className="top-wrap">
					<div className="title">
						<a href={this.props.href} className="back"></a>
						<h1>{this.props.title}</h1>
					</div>
				</div>
			</header>
		)
	}
});

module.exports = Header;