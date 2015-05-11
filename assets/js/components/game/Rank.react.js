var React = require('react'),
	Header = require('../common/Header.react'),
	RankTop = require('./RankTop.react'),
	RankList = require('./RankList.react'),
	GameStore = require('../../stores/GameStore')
	;

function getRankState() {
	return {
		rankList: GameStore.getRankList()
	}
}

var Rank = React.createClass({

	getInitialState: function() {
		return getRankState();
	},

	render: function() {
		return (
			<div className="module">
				<Header title="排行榜" href="/" />
				<section className="layout-center">
					<RankTop />
				</section>
				<section className="layout-center">
					<RankList />
				</section>
			</div>
		)
	}
})

module.exports = Rank;