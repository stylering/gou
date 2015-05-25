var React = require('react');
var Tags = require('./Tags.react');
var ShopList = require('./ShopList.react');

var Shops = React.createClass({

	render: function() {
		var hashId = this.props.params.id || '';
		return (
			<div className="layout-center">
				<Tags id={hashId} />
				<ShopList id={hashId} />
			</div>
		)
	}
})

module.exports = Shops;