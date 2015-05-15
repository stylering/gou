var React = require('react')
	GameAPI = require('../../utils/GameAPI'),
	GameStore = require('../../stores/GameStore');

GameAPI.getRankList();

var EllipsisItem = React.createClass({
	render: function() {
		return (
			<li className="item ellipsis-text">
				<span></span>
				<span></span>
				<span></span>
			</li>
		)
	}
});

var Item = React.createClass({

	render: function() {

		var dataList = this.props.dataList,
			statusClass = 'item',
			current = '',
			rank = this.props.dataList.rank,
			expend = this.props.dataList.expend;

		if (dataList['win']) {
			statusClass = 'item win';
			rank = <span className="cup"></span>;
			expend = <span className="strong">{this.props.dataList.expend}</span>;
		} else if (dataList['current']) {
			statusClass = 'item current';
			current = <div className="circle-text">您在此</div>;
		}

		return (
			<li className={statusClass}>
				{current}
				<ul>
					<li>{rank}</li>
					<li>{this.props.dataList.name}</li>
					<li>{expend}</li>
				</ul>
			</li>
		)
	}
})

function getRankList() {
	return {
		rankList: GameStore.getAll()
	}
}

function getRankItem (list) {
	if (list['ellipsis-text']) {
		return (
			<EllipsisItem />
		)
	}

	return (
		<Item dataList={list} />
	)
}

var RankList = React.createClass({

	getInitialState: function() {
		return getRankList();
	},

	componentDidMount: function() {
		GameStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		GameStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var rankItems = this.state.rankList.map(getRankItem);
		return (
			<ul className="cut-rank-list">
				{rankItems}
			</ul>
		)
	},

	_onChange: function() {
		this.setState(getRankList());
	}
})

module.exports = RankList;