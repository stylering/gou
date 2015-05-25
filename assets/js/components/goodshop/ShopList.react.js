var React = require('react');
var ShopsStore = require('../../stores/ShopsStore');
var GoodShopAPI = require('../../utils/GoodShopAPI');
var InfiniteScroll = require('../../common/react-infinite-scroll')(React);

function getShopsFromServer(args) {
	GoodShopAPI.getShops(args);
}

var ShopItem = React.createClass({

	render: function() {
		var item = this.props.shopItem;
		return (
			<div className="goodshop">
				<i className="serial ico-serial">{item.num}</i>
				<div className="cont">
					<div className="header">
						<div className="logo">
							<img src={item.logo}/>
						</div>
						<a href={item.url} className="intro">
							<h2>{item.title}</h2>
							<p></p>
						</a>
						<div className="aside J_aside"></div>
					</div>
					<a href={item.url}>
						<ul className="pics">
							<li><img src={item.goods[0]}/></li>
							<li><img src={item.goods[1]}/></li>
							<li><img src={item.goods[2]}/></li>
						</ul>
					</a>
				</div>
			</div>
		)
	}
});

var ShopItems = React.createClass({
	render: function() {
		var shopList = this.props.shopList;
		return (
			<div>
				{shopList.map(function(shop, index){
					return <ShopItem key={index} shopItem={shop} />
				})}
			</div>
		)
	}
});


var ShopList = React.createClass({

	getInitialState: function() {
		// var id = this.props.id;
		// getShopsFromServer({id: id});
		return {
			hasnext: true,
			shopList: []
		}
	},

	componentDidMount: function() {
		ShopsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ShopsStore.removeChangeListener(this._onChange);
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.props.id != nextProps.id) {
			this.state.shopList = [];
			this.state.page = 1;
			getShopsFromServer({
				id: nextProps.id, 
				page: this.state.page
			});
		}
	},

	render: function() {
		return (
			<InfiniteScroll 
				loadMore={this._loadMore} 
				hasnext={this.state.hasnext} 
				page={this.state.page}>
				<ShopItems shopList={this.state.shopList} />
			</InfiniteScroll>
		)
	},

	_loadMore: function() {
		var id = this.props.id;
		var page = this.state.page = (this.state.page || 0) + 1;
		getShopsFromServer({
			id: id, 
			page: page
		});
	},

	_onChange: function() {
		this.setState(this._getShopsFromStore());
	},

	_getShopsFromStore: function() {
		var data = ShopsStore.getAll();
		var list = [];
		var hasnext = false;

		if (data.list) list = data.list;
		if (data.hasnext) hasnext = true;

		list = this.state.shopList.concat(list);
		return {
			shopList: list,
			hasnext: hasnext
		}
	}
})

module.exports = ShopList;