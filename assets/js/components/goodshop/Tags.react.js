var React = require('react');
var TagsStore = require('../../stores/TagsStore');
var GoodShopAPI = require('../../utils/GoodShopAPI');

GoodShopAPI.getTags();

function getTags() {
	return {
		tags: TagsStore.getAll()
	}
}

function tagsIterator(tag) {
	return (
		<Tag tag={tag} />
	)
}

var Tag = React.createClass({
	render: function() {
		return (
			<li><a href="javascipt:void(0);">{this.props.tag}</a></li>
		)
	}
});

var Tags = React.createClass({

	getInitialState: function() {
		return getTags();
	},

	render: function() {
		var tags = this.state.tags.map(tagsIterator);
		return (
			<div className="slide-tab-box">
				<ul id="J_slideTab" className="slide-tab">
					{tags}
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