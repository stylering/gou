var React = require('react'),
	Header = require('../common/Header.react'),
	RankTop = require('./RankTop.react'),
	RankList = require('./RankList.react');

var Rank = React.createClass({

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