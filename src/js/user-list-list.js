import page from './user-list-page.js';
import { $list } from './user-list-dom.js';
import Data from './user-list-data.js';
import Dept from './user-list-dept.js';
import log from './log.js';

$list.detach();

var listPage = Object.create(page);

$.extend(listPage, {
    
    $el: $list,
    
	$aToggleAll: $list.find('#a-toggle-all'),
	
    $body: $list.find('#list-body'),
    
	deptList: [],
	
    init: function () {
        
    	Data.getDeptUserList($.proxy(this.showData, this));
        
		this.enableToggle();
		
    },
    
    showData: function (data) {
    	
        var $body = this.$body,
			deptList = this.deptList;
        
        data.forEach(function (dept, i) {
        	
            deptList[i] = Dept.create($body, dept);
            
        });
        
    },
    
	enableToggle: function () {
		
		var deptList = this.deptList,
			self = this;
		
		this.$aToggleAll.click(function (e) {
		
			e.preventDefault();
			
			self.toggleAll();
			
		});
		
	},
	
	toggleAll: function () {
		this.collapsed ? 
			this.expandAll() :
			this.collapseAll();
	},
	
	expandAll: function () {
		this.collapsed = false;
		this.$el.removeClass('collapsed');
		this.deptList.forEach(function (dept) {
			dept.expand();
		});
	},
	
	collapseAll: function () {
		this.collapsed = true;
		this.$el.addClass('collapsed');
		this.deptList.forEach(function (dept) {
			dept.collapse();
		});
	},
	
});

$(function () {
	listPage.init();
});



export default listPage;



