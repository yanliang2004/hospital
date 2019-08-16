


(function () {
	
    
    var page = (function () {
    	
    	function appendTo($parent) {
    		this.$el.appendTo($parent);
    	}
        
        function detach() {
        	this.$el.detach();
        }
    	
        return {
            appendTo: appendTo,
            detach: detach
        };
        
    }());
	
    var pageList = (function () {
    	
        var $el = $('#list').detach();
        
    	var pageList = Object.create(page);
        
        var Dept = (function () {
        	
        	var $tmpl = getTmpl();
        	
            function getTmpl() {
            	return $el.find('dept-tmpl')
                          .detach()
                          .removeAttr('id');
            }
            
            
            var User = (function () {
            	
            	var $utmpl = getUserTmpl();
                
                function getUserTmpl() {
                	return $tmpl.find('#user-tmpl')
                            .detach()
                            .removeAttr('id');
                }
                
                function User($parent, data) {
                	
                    var $el =
                    this.$el = $utmpl.clone();
                    
                    this.$name = $el.find('.name');
                    
                    this.$uname = $el.find('.uname');
                    
                    this.showData(data);
                }
                
                $.extend(User.prototype, {
                    
                    showData: function (data) {
                    	this.$name.text(data.name);
                        this.$uname.text(data.uname);
                    }
                    
                });
                
                $.extend(User, {
                    
                    create: function ($parent, data) {
                    	return new User($parent, data);
                    }
                    
                });
                
            	return User;
                
            }());
            
            
            function Dept($parent, arrUsers) {
            	
                this.$el = $tmpl.clone()
                                .appendTo($parent);
                
                this.createUsers(arrUsers);
                
            }
            
            $.extend(Dept.prototype, {
                
                showUsers: function (arrUsers) {
                	var $users =
                    this.$users = this.$el.find('.users');
                    
                    $.each(arrUsers, function (i, user) {
                    	User.create($users, user);
                    });
                },
                
                toggle: function (collapsed) {
                	this.$el.toggleClass('collapsed', collapsed);
                },
                
                
            });
            
            $.extend(Dept, {
                
                create: function ($parent, arrUsers) {
                	return new Dept($parent, arrUsers);
                }
                
            });
            
            
            return Dept;
            
        }());
        
        var header = (function () {
        	
        	var $aToggleAll = $el.find('#a-toggle-all');
        	
            $aToggleAll.click(function (e) {
            	e.preventDefault();
                
                pageList.toggleAll();
            });
            
            return {};
            
        }());
        
        $.extend(pageList, {
            
            $el: $el,
            
            $listBody: $el.find('#list-body'),
            
            showData: function (depts) {
            	
                var deptList = this.deptList = [];
                
                var $parent = this.$listBody;
                
                $.each(depts, function (i, dept) {
                	
                    deptList[i] = Dept.create($listBody, dept);
                    
                });
            },
            
            collapsed: false,
            
            toggleAll: function () {
                
                var collapsed =
                this.collapsed = !this.collapsed;
                
            	$.each(this.deptList, function (i, dept) {
            		
                    dept.toggle(collapsed);
                    
            	});
            },
            
        });
        
        
        
        return pageList;
    	
    }());;
    
    var pageDetail = Object.create(page, {
        $el: {value: $('#detail').detach()}
    });
    
    
    var winNarrow = (function () {
    	
        var $main = $('#main');
        
        var curPage;
        
    	function showPage(page) {
    		if (curPage != page) {
                
                curPage && curPage.detach();
                
                page.appendTo($main);
                
                curPage = page;
            }
    	}
        
        return {
            showPage: showPage
        };
    	
    }());
    
    var winWide = (function () {
    	
        var $main = $('#main'),
            $detailPanel = $('#detail-panel');
        
    	function showPage(page) {
            
            if (pageList.$el[0].parentNode != $main) {
                pageList.appendTo($main);
            }
            
            page == pageDetail ?
                pageDetail.appendTo($detailPanel) :
                pageDetail.detach();
            
    	}
        
        
        return {
            showPage: showPage
        };
    	
    }());
    
    var spa = (function () {
    	
    	var $w = $(window);
    	
        var win;
        
        var pages;
        
        function init(objPages) {
            
        	pages = objPages;
            
            win = determineWin();
            
            $w.on('hashchange', showUri);
            
            showUri();
        }
        
        function determineWin() {
        	var $detailPanel = $('#detail-panel');
            
            if ('none' == $detailPanel.css('display')) {
                return winNarrow;
            }
            else {
                return winWide;
            }
        }
        
        function showUri() {
            var name = location.hash.slice(1);
            
            var page = getPage(name);
            
        	win.showPage(page);
            
            // console.log(page);
            
        }
        
        function getPage(name) {
        	return pages[name] ||
                   pages.list;
        }
        
        
        return {
            init: init
        };
        
    }());
    
    
    var app = (function () {
    	
        function init() {
        	spa.init({
                list: pageList,
                detail: pageDetail
            });
            
            
            
        }
    	
        return {
            init: init
        };
    	
    }());
    
    app.init();
    
}());

