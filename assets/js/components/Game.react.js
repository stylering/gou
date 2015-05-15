var React = require('react'),
	zepto = require('zepto'),
	Rank = require('./game/Rank.react')
	;

React.render(
	<Rank />,
	$('body')[0]
)