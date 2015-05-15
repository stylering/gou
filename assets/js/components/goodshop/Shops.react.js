var React = require('react');
var ShopsStore = require('../../stores/ShopsStore');
var GoodShopAPI = require('../../utils/GoodShopAPI');
var InfiniteScroll = require('../../common/react-infinite-scroll')(React);

GoodShopAPI.getShops();

function getShops() {
	return {
		shops: ShopsStore.getAll()
	}
}

var Shops = React.createClass({

	getInitialState: function() {
		return getShops();
	},

	render: function() {
		var i = 0;

		var shops = this.state.shops;

		return (
			<InfiniteScroll
				pageStart="0"
				loadMore={getShops}
				hasMore={true}
				loader={<div className="loader">loading...</div>}>
			
				{shops.map(function(shop){
					return (
						<div className="goodshop">
							<i className="serial ico-serial">{shop.num}</i>
							<div className="cont">
								<div className="header">
									<div className="logo">
										<img src={shop.logo}/>
									</div>
									<a href={shop.url} className="intro">
										<h2>{shop.title}</h2>
										<p></p>
									</a>
									<div className="aside J_aside"></div>
								</div>
								<a href={shop.url}>
									<ul className="pics">
										<li><img src={shop.goods[0]}/></li>
										<li><img src={shop.goods[1]}/></li>
										<li><img src={shop.goods[2]}/></li>
									</ul>
								</a>
							</div>
						</div>
					)
				})}
			</InfiniteScroll>
		)
	},

	componentDidMount: function() {
		ShopsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ShopsStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getShops());
	}
})

module.exports = Shops;