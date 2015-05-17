var React = require('react');
var ShopsStore = require('../../stores/ShopsStore');
var GoodShopAPI = require('../../utils/GoodShopAPI');
var InfiniteScroll = require('../../common/react-infinite-scroll')(React);
var Toast = require('../common/Toast.react');

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
			page: 0
		}
	},

	loadMore: function() {
		getShopsFromServer({
			page: this.state.page + 1
		})
	},

	componentDidMount: function() {
		ShopsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ShopsStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var i = 0;
		var shops = this.state.shops;
		return (
			<InfiniteScroll
				threshold="10"
				loadMore={this.loadMore}
				hasnext={this.state.hasnext}
				// loading={<div className="msg-tip"><span>努力加载中...</span></div>}
				>
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