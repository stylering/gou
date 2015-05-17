module.exports = function(React){
	return {
		parse: function (args) {
			try {
				return JSON.parse(args);
			} catch (e) {
				return args;
			}
		},

		stringify: function(args) {
			return JSON.stringify(args);
		},

		// 底部toast提示
		showTip: function(msg) {
			var body = $('body'),
				tip = body.find('.J_msgTip');

			if(tip[0]){
				tip.html(msg);
				tip.parent().show();
			} else {
				body.append('<div class="msg-tip"><span class="J_msgTip">'+msg+'</span></div>');
				tip = body.find('.J_msgTip');
			}

			setTimeout(function(){
				tip.parent().hide();//fixed bug: 行内元素居然不起作用。。。
			}, 3000);
		}
	}
}