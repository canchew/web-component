var tpl = {popupDialog: __inline('./tpl/wicket-list.handlebars')};

var common = require('modules/common'), 
    uie = require('common/zepto-event'),
    Page = require('common/page'),
    writeCommon = require('pages/chatting-writecomment'),
    Model = require('./model.js'),
    refreshInterval = require('pages/chatting-index/refresh-interval.js'),
    livebar = require('modules/chatting-livebar');

var chattingLive = _.extend(new Page(),{
    init: function() {
        this.$el = $('#tab-live');
        this.uie = uie(this.$el);
        this.competitionId = $('#competition-id').val();
        this.matchType = parseInt($('#match-type').val());
        this.bindEvent();
    },
    bindEvent: function () {
        this.on({
            'click .last-wicket-name': this.onLastWicketNameClick,
            'click #chatting-full-wkts': this.onFullWtksClick,
            'click .wicket-list .wl-name': this.onWlNameClick,
            'click #wl-close-btn': this.onWlCloseBtnClick,
            'click #top-close-btn': this.onWlCloseBtnClick,
            'click #live-highlights-btn': this.onHighlightsBtnClick,
            'click .ballReply .Reply .replyBtn': this.onCommenterReply
        });
    },

	onHighlightsBtnClick: function() {
        $('#tab-btn-highlights').find('a').trigger('click');
        window.scrollTo(0, 0); //让滚动条滚动到顶部
    },
	onLastWicketNameClick: function() {
        var target = this.$el.find('.last-wicket-name').data('target');
        common.statistic({
            stat_action: 'fallOfWickets:last-wicket-name',
        }, function() {
            window.location.href = target;
        });
    },
    onFullWtksClick: function() {
        var that = this;
        this.$el.find('#chatting-wicket-list').show();
        refreshInterval.stop();
		Model.getWicketList({'competitionId':that.competitionId}, function(data){
            var html = tpl.popupDialog(data);
            that.$el.find('#wicket-list').html(html);

            that.$el.find('.wicket-list-dummy').height($('body').height());
        });

        common.statistic({
            stat_action: 'fallOfWickets:full-wkts',
        });
    },
    onWlNameClick: function() {
        common.statistic({
            stat_action: 'fallOfWickets:wicket-list-name',
        });
    },
    onWlCloseBtnClick: function() {
        if(this.matchType === 0) {
            refreshInterval.start();
        }
        this.$el.find('#chatting-wicket-list').hide();
    },
	onCommenterReply: function() {
        var commentaryId = this.$el.find('.ballDesc .CommentaryId').text();
        livebar.hide();
        writeCommon.show({
            'Commentator' : {
                'id' : commentaryId,
                'name' : 'Commentator'
            }
        });

        common.statistic({
            stat_action: 'live:commentator-reply'
        });
    }
});

Handlebars.registerHelper("addOne",function(index){
    return index+1;
});

module.exports = chattingLive;