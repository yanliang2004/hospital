
var page = {
	
	appendTo: function ($parent) {
		this.$el &&
			this.$el.appendTo($parent);
	},
	
	detach: function () {
		this.$el && this.$el.detach();
	},
	
};



var ListPage = (function () {
	
	var $listPage = $('#list-page').detach(),
		instance = new ListPage($listPage);
	
	function ListPage($el) {
		this.$el = $el;
		
	}
	
	$.extend(ListPage.prototype, page, {
		
		
	});
	
	$.extend(ListPage, {
		
		instance: function () {
			return instance;
		},
		
	});

	return ListPage;

}());


var DetailPage = (function () {

	var $detailPage = $('#detail-page').detach(),
		instance = new DetailPage($detailPage);

	function DetailPage($el) {
		this.$el = $el;
		
		this.$hl = $el.find('#detail-hl');
	}
	
	$.extend(DetailPage.prototype, page, {
		
		setState: function (state) {
			this[state + 'State']();
			return this;
		},
		
		newState: function () {
			this.$hl.text('新增用户');
		},
		
		editState: function () {
			this.$hl.text('修改用户信息');
		},
		
	});

	$.extend(DetailPage, {
		instance: function () {
			return instance;
		}
	});
	
	return DetailPage;
	
}());

var $main = $('#main-panel');

