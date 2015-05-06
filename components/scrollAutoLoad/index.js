var common = require('modules/common'),
    model = require('./model.js'),
    uie = require('common/zepto-event'),
    Page = require('common/page'),
    PAGE_SIZE = 20;

var tpl = {
    resultList: __inline('./tpl/result-list.handlebars')
};

//用来控制页面滑动加载的请求不会重复加载同一份数据
var loading = false;

var coverage = _.extend(new Page(), {
	init: function() {
		this.$el = $('#content');
        this.uie = uie(this.$el);

        this.competitionId = $('#competition-id').val();

        this.bindEvent();
	},
	bindEvent: function() {
		var that = this;
		//滚动事件绑定
        $(window).on('scroll', function() {
            var scrollHeight = $(window).scrollTop(),//表示document顶部距离当前window窗口上边的高度
                windowHeight = $(window).height(),
                documentHeight = $(document).height(),
                reachBottom = (scrollHeight + windowHeight + 50) >= documentHeight;

            if (reachBottom && !loading){
                that.loadMoreHistory();
            }
        });
	},
	loadMoreHistory: function() {
		loading = true;

		var that = this,
			$table = this.$el.find('#resultList'),
			noreq = $table.data('noreq');
			

		if(!noreq){
			var pageValue = parseInt($table.data('page')),
				startValue = $('#resultList').children().size() - 1; //第一行是tabale的头部
			params = {
				competitionId: that.competitionId,
				start: startValue,
				limit: PAGE_SIZE				
			};

			model.getResultList(params, function(data){
				if(data.length){
					var html = tpl.resultList(data);
					$table.append(html);

					loading = false;
				}else{
					that.$el.find('[data-info]').text('no more results');
					$table.data('noreq', 'true');

					loading = false;
				}

                var newPageValue = pageValue + 1;
                $table.data('page', newPageValue);
                common.statistic({
                    stat_action: 'history:loadmore',
                    stat_index: newPageValue,
                    stat_type: 'loadmore'
                });
			});
		}
	}
});

module.exports = coverage;