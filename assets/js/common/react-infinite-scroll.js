var Toast = require('../components/common/Toast.react');

function topPosition(elem) {
    if (!elem) {
        return 0;
    }
    return elem.offsetTop + topPosition(elem.offsetParent);
}

module.exports = function(React) {
    if (React.addons && React.addons.InfiniteScroll) {
        return React.addons.InfiniteScroll;
    }

    React.addons = React.addons || {};

    var InfiniteScroll = React.addons.InfiniteScroll = React.createClass({
        
        getInitialState: function() {
            return {
                msg: ''
            }
        },

        getDefaultProps: function() {
            return {
                page: 0,
                hasnext: false,
                loadMore: function() {},
                threshold: 0,
                loading: '努力加载中...',
                loaded: '没有更多了'
            }
        },

        componentDidMount: function() {
            this.attachScrollListener();
        },

        componentDidUpdate: function() {
            this.attachScrollListener();
        },

        render: function() {
            var props = this.props;
            // return React.DOM.div(null, props.children, props.hasnext && (props.loading || InfiniteScroll._defaultLoading));
            return (
                <div>
                    {props.children}
                    <Toast msg={this.state.msg} />
                </div>
            )
        },

        scrollListener: function() {
            var el = this.getDOMNode();
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset 
                : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var isLoad = topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold);
            if (isLoad) {
                this.detachScrollListener();
                this.props.loadMore();
            }
        },

        attachScrollListener: function() {
            var props = this.props;
            if (!props.hasnext) {
                console.log('11111')
                this.state.msg = props.loaded;
                return;
            }
            this.state.msg = props.loading;
            window.addEventListener('scroll', this.scrollListener);
            window.addEventListener('resize', this.scrollListener);
            this.scrollListener();
        },

        detachScrollListener: function() {
            window.removeEventListener('scroll', this.scrollListener);
            window.removeEventListener('resize', this.scrollListener);
        },

        componentWillUnmount: function() {
            this.detachScrollListener();
        }
    });

    InfiniteScroll.setDefaultLoading = function (loading) {
        InfiniteScroll._defaultLoading = loading;
    }

    return InfiniteScroll;
}