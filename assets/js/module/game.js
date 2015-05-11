var React = require('react'),
	zepto = require('zepto'),
	Rank = require('../components/game/Rank.react')
	;

React.render(
	<Rank />,
	$('body')[0]
)