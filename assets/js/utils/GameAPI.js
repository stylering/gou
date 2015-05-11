module.exports = {

	getRankList: function() {
		$.ajax({
			url: '/gou/demo/api/game/rank.json',
			dataType: 'JSON',
			success: function(result) {
				console.log(result);
			}
		})
	}

}