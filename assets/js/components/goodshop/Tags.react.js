var React = require('react');
var TagsStore = require('../../stores/TagsStore');
var GoodShopAPI = require('../../utils/GoodShopAPI');

GoodShopAPI.getTags();

function getTags() {
	return {
		tags: TagsStore.getAll(),
	}
}

var Tags = React.createClass({

	getInitialState: function() {
		return getTags();
	},

	render: function() {
		var id = this.props.id;
		return (
			<div className="slide-tab-box">
				<ul id="J_slideTab" className="slide-tab">
					<li className={ id==''? 'active' : '' }><a href="#/">全部</a></li>
					{this.state.tags.map(function(tag) {
						return <li className={ tag.id == id ? 'active' : '' }><a href={'#'+tag.id}>{tag.name}</a></li>
					})}
				</ul>
			</div>
		)
	},

	componentDidMount: function() {
		TagsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		TagsStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getTags());
	}
})

module.exports = Tags;