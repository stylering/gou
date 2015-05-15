var React = require('react');
var Header = require('./common/Header.react');
var Tags = require('./goodshop/Tags.react');
var Shops = require('./goodshop/Shops.react');

var GoodShop = React.createClass({
	render: function() {
		return (
			<div className="module">
				<Header title="排行榜" href="/" />
				<section className="layout-center">
					<Tags />
				</section>
				<section className="layout-center">
					<Shops />
				</section>
			</div>
		)
	}
})

React.render(
	<GoodShop />,
	document.getElementsByTagName('body')[0]
)