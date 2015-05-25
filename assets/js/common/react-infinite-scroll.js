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

    var msg = '';

    var InfiniteScroll = React.addons.InfiniteScroll = React.createClass({
        
        getInitialState: function() {
            return {
                msg: ''
            }
        },

        getDefaultProps: function() {
            return {
                hasnext: false,
                loadMore: function() {},
                threshold: 10,
                loading: '努力加载中...',
                loaded: '没有更多了'
            }
        },

        componentDidMount: function() {
            this.attachScrollListener();
        },

        /*componentDidUpdate: function() {
            this.attachScrollListener();
        },*/

        render: function() {
            var props = this.props;
            var toast;
            // return React.DOM.div(null, props.children, props.hasnext && (props.loading || InfiniteScroll._defaultLoading));
            if (this.state.open) {
                toast = <Toast isOpen={true} msg={this.state.msg}/>
            }
            return (
                <div>
                    {props.children}
                    {toast}
                </div>
            )
        },

        scrollListener: function() {
            var el = this.getDOMNode();
            var props;
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset 
                : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var isLoad = topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold);
            if (isLoad) {
                // this.detachScrollListener();
                var props = this.props;
                console.log(props)
                if (!props.hasnext) {
                    this.showMsg(props.loaded);
                    return;
                }
                if (props.page+1 > 1) {
                    this.showMsg(props.loading);
                }
                this.props.loadMore();
            }
        },

        showMsg: function(msg) {
            this.setState({
                msg: msg,
                open: true
            })
        },

        hideMsg: function() {
            this.setState({
                open: false
            })
        },

        attachScrollListener: function() {
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