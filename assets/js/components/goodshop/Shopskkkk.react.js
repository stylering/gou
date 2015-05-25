var React = require('react');
var ShopsStore = require('../../stores/ShopsStore');
var GoodShopAPI = require('../../utils/GoodShopAPI');
var InfiniteScroll = require('../../common/react-infinite-scroll')(React);
var Toast = require('../common/Toast.react');
var ShopItem = require('./ShopItem.react');
var Router = require('react-router');

// page: 1,
// uid: ''
// tag_id: '',
function getShopsFromServer(args) {
	GoodShopAPI.getShops(args);
}

// getShopsFromServer();

function getShops() {
	var shops = ShopsStore.getAll();
	return {
		shops: shops.list,
		hasnext: shops.hasnext,
		page: shops.curpage
	}
}

var Shops = React.createClass({

	getInitialState: function() {
		getShops();
		return {
			shops: [],
			hasnext: true,
			page: 0,
			id: ''
		}
	},

	loadMore: function() {
		var id = this.props.params.id || '';
		getShopsFromServer({
			page: this.state.page + 1,
			id: id
		})
	},

	componentDidMount: function() {
		ShopsStore.addChangeListener(this._onChange);
	},

	componentDidUpdate: function() {
		console.log('11111')
	},

	componentWillUnmount: function() {
		ShopsStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function(nextProps) {
		getShopsFromServer({
			id: nextProps.params.id
		});
	},

	render: function() {
		var i = 0;
		var shops = this.state.shops;
		console.log(shops)
		return (
			<div>
				{shops.map(function(shop, index){
					return <ShopItem key={index} shopItem={shop} />
				})}
			</div>
		)
		/*return (
			<InfiniteScroll
				threshold="10"
				loadMore={this.loadMore}
				hasnext={this.state.hasnext}>
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
		)*/
	},

	_onChange: function() {
		var data = getShops();
		this.setState({
			shops: this.state.shops.concat(data.shops),
			hasnext: data.hasnext,
			page: data.page
		})
	}
})

module.exports = Shops;