var React = require('react')
	;


var Item = React.createClass({
	render: function() {
		return (
			<li className="item">
				<ul>
					<li>1</li>
					<li>丁俊晖</li>
					<li>10.54</li>
				</ul>
			</li>
		)
	}
});

var WinItem = React.createClass({
	render: function() {
		return (
			<li className="item win" displayName="nav">
				<ul>
					<li>
						<span className="cup"></span>
					</li>
					<li>丁俊晖</li>
					<li className="align-left">
						<span className="strong">10.54</span>
					</li>
				</ul>
			</li>
		)
	}
})

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
})

var CurrentItem = React.createClass({

	/*componentDidMount: function() {
		$.ajax({
			url: '/gou/demo/api/game/rank.json',
			dataType: 'JSON',
			success: function(result) {
				console.log(result);
			}
		})
	},*/

	render: function() {
		return (
			<li className="item current">
				<div className="circle-text">您在此</div>
				<ul>
					<li>1</li>
					<li>丁俊晖</li>
					<li>10.54</li>
				</ul>
			</li>
		)
	}
})

var RankList = React.createClass({
	render: function() {
		return (
			<ul className="cut-rank-list">
				<WinItem />
				<Item />
				<EllipsisItem />
				<Item />
				<CurrentItem />
				<Item />
			</ul>
		)
	}
})

module.exports = RankList;