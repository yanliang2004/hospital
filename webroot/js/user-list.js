(function () {
	'use strict';

	var $btnUser = $('#btn-user'),
		$userMenu = $('#user-menu'),
		$aUserInfo = $('#a-user-info'),
		$aChangePw = $('#a-change-pw'),
		$aLogout = $('#a-logout');

	function enableDropDown() {
		
		$btnUser.click(function (e) {
			
			e.preventDefault();
			
			$userMenu.slideToggle(200);
			
		});
	}

	function enableLogout() {
		$aLogout.click(function (e) {
			e.preventDefault();
			
			$.post('logout.php');
			
			window.location = 'login.html';
		});
	}

	function init() {
		
		enableDropDown();
		
		enableLogout();
		
	}


	init();

	var $w = $(window);

	var $mainPanel = $('#main-panel'),
	    $detailPanel = $('#detail-panel');

	var $list = $('#list'),
	    $aToggleAll = $list.find('#a-toggle-all'),
	    $listBody = $list.find('#list-body'),
	    $deptTmpl = $list.find('#dept-tmpl'),
	    $userTmpl = $deptTmpl.find('#user-tmpl');

	var $detail = $('#detail'),
	    $frmUser = $detail.find('#frm-user');

	var page = {
	    
	    appendTo: function ($parent) {
	    	this.$el.appendTo($parent);
	        
	        // enable method chaining:
	        return this;
	    },
	    
	    detach: function () {
	    	this.$el.detach();
	        
	        // enable method chaining: 
	        return this;
	    },
	    
	    show: function () {
	    	
	        this.$el.show();
	        
	        return this;
	        
	    },
	    
	    hide: function () {
	    	this.$el.hide();
	        
	        return this;
	    },
	    
	};

	var Data = {

	    getDeptUserList: function (fn) {
	        $.getJSON('dept-user-list.php', function (data) {
	            fn(data);
	        });
	    },

	    getUser: function (id, fn) {
	        $.getJSON('user.php', { id: id }, function (data) {
	            fn(data);
	        });
	    },

	    saveUser: function (userData, fn) {

	        $.post('addUser.php', userData, function (data) {
	            fn(data);
	        });

	    },

	    // reset pw to 1234
	    resetPw: function (id, fn) {
	        $.post('resetPw.php', { id: id }, fn);
	    },

	};

	initUserTmpl();

	function initUserTmpl() {
		$userTmpl.detach()
	             .removeAttr('id');
	}

	function User($parent, data) {
		
	    var $el =
	    this.$el = $userTmpl.clone();
	    
	    this.$name = $el.find('.name');
	    
	    this.$uname = $el.find('.uname');
	    
	    this.showData(data);
	    
	    $el.appendTo($parent);
	}

	$.extend(User.prototype, {
	    
	    showData: function (data) {
	    	this.$name.text(data.name);
	        this.$uname.text(data.uname);
	        
	        this.$el.attr('href', '#' + $.uriAnchor.makeAnchorString({
	            page: 'user',
	            _page: {
	                id: data.id,
					name: data.name,
					uname: data.uname,
					dept: data.dept
	            }
	        }));
	    },
	    
	});

	$.extend(User, {
	    
	    create: function ($parent, data) {
	    	return new User($parent, data);
	    }
	    
	});

	initDeptTmpl();

	function initDeptTmpl() {
		$deptTmpl.detach()
	             .removeAttr('id');
	}

	function Dept($parent, data) {
		
	    var $el =
	    this.$el = $deptTmpl.clone();
	    
	    this.$deptName = $el.find('.dept-name');
	    
	    this.$users = $el.find('.users');
	    
	    this.showData(data);
	    
	    this.enableToggle();
	    
	    $el.appendTo($parent);
	    
	}

	$.extend(Dept.prototype, {
	    
	    showData: function (data) {
	    	
	        this.$deptName.text(data.name);
	        
	        var $users = this.$users;
	        
	        data.users.forEach(function (user, i) {
				// 添加科室名称
				user.dept = data.name;
				
	        	User.create($users, user);
	        });
	        
	    },
	    
	    enableToggle: function () {
	    	var $el = this.$el,
	            $aToggle = $el.find('.a-toggle');
	        
	        $aToggle.click(function (e) {
	        	e.preventDefault();
	            
	            $el.toggleClass('collapsed');
				
	        });
	    },
	    
		collapse: function () {
			this.$el.addClass('collapsed');
		},
		
		expand: function () {
			this.$el.removeClass('collapsed');
		},
		
	});

	$.extend(Dept, {
	    
	    create: function ($parent, data) {
	    	return new Dept($parent, data);
	    },
	    
	});

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

	function PwField($btn, $label) {
	    this.$btn = $btn;
	    this.$label = $label;

	    this.stateNew = initStateNew($btn, $label);
	    this.stateEdit = initStateEdit($btn, $label);

	    this.setStateNew();

	    var state = this.state;

	    this.$btn.click(function (e) {

	        state.onclick(e);

	    });


	}

	function initStateNew($btn, $label) {
	    return {
	        apply: function () {
	            $label.text('初始密码');
	            $btn.text('1234')
	                .prop('disabled', true)
	                .removeClass('active');
	        },

	        freeze: function () {
	            // no operation
	        },

	        unfreeze: function () {
	            // no operation
	        },

	        onclick: function (e) {
	            // no operation
	        }

	    };
	}

	function initStateEdit($btn, $label) {
	    return {
	        apply: function () {
	            $label.text('密码');
	            $btn.text('重置为 1234')
	                .prop('disabled', false)
	                .addClass('active');

	        },

	        freeze: function () {
	            $btn.prop('disabled', true);
	        },

	        unfreeze: function () {
	            $btn.prop('disabled', false);
	        },

	        // reset pw
	        onclick: function () {

	        }


	    };
	}

	$.extend(PwField.prototype, {

	    setStateNew: function () {
	        this.state = this.stateNew;
	        this.state.apply();
	    },

	    setStateEdit: function () {
	        this.state = this.stateEdit;
	        this.state.apply();
	    },

	    freeze: function () {

	        this.state.freeze();

	    },

	    unfreeze: function () {
	        this.state.unfreeze();
	    },

	});

	$.extend(PwField, {

	    instance: function ($input, $label) {
	        return new PwField($input, $label);
	    },

	});

	var frmUser = function () {

		var $frm = $detail.find('#frm-user'),
			$hl = $frm.find('#detail-hl'),
			$name = $frm.find('#name'),
			$uname = $frm.find('#uname'),
			$dept = $frm.find('#dept'),
			$btnSave = $frm.find('#btn-save');

		var pwField = new PwField(
			$frm.find('#reset-pw'),
			$frm.find('#label-reset-pw')
		);

		var data, state;

		// btnSave enabled only when data changed:
		$frm.on('input', function (e) {

			console.log(e.target);
			$btnSave.prop('disabled', !dataChanged());
		});

		function dataChanged() {
			return data.uname != $uname.val() ||
				data.name != $name.val() ||
				data.deptId != $dept.val();
		}

		// state pattern
		var stateNew = function () {

			function collectFormData() {
				return {
					name: $name.val(),
					uname: $uname.val(),
					deptId: $dept.val()
				};
			}

			function onPostResult(data) {
				
				console.log(data);

				unfreeze();
			}

			return {

				apply: function () {
					$hl.text('新增用户');
					$name.val('');
					$uname.val('');
					pwField.setStateNew();
				},

				submit: function () {

					$.post('addUser.php', collectFormData(), onPostResult, 'json');

				},

			};

		} ();

		// state pattern
		var stateEdit = function () {

			function updatedFields() {
				var fields = {};

				$.each([$uname, $name, $dept], function (i, $input) {
					var key = $input.prop('name'),
						value = $input.val();

					if (data[key] != value) {
						fields[key] = value;
					}

				});

				fields.id = data.id;
				
				return fields;
			}

			function onPostResult(data) {
				
				console.log(data);

				unfreeze();
			}

			return {

				apply: function () {
					$hl.text('修改用户信息');
					$name.val(data.name);
					$uname.val(data.uname);
					$dept.val(data.deptId);
					pwField.setStateEdit();



				},

				submit: function () {
					$.post('updateUser.php', updatedFields(), onPostResult, 'json');
				},



			};

		} ();



		var validator = $frm.validate({
			success: 'valid',
			submitHandler: function () {
				console.log('submitting...');
				freeze();
				state.submit();
			}
		});


		// when submitting, freeze form
		function freeze() {
			$.each([$name, $uname, $dept], function (i, $input) {
				$input.prop('readonly', true);
			});
			
			pwField.freeze();

			$btnSave.prop('disabled', true);

			
		}

		function unfreeze() {
			$.each([$name, $uname, $dept], function (i, $input) {
				$input.prop('readonly', false);
			});
			
			pwField.unfreeze();

			$btnSave.prop('disabled', false);
		}


		return {

			setData: function (d) {
				data = d;

				// console.log('frm.setData(): ' + JSON.stringify(data));

			},

			setStateNew: function () {
				state = stateNew;
				state.apply();
			},

			setStateEdit: function () {

				console.log('frm.setStateEdit(): ' + JSON.stringify(data));


				state = stateEdit;
				state.apply();
			},

		};

	} ();

	$detail.detach();

	var detailPage = Object.create(page);

	$.extend(detailPage, {
	    
	    init: function () {
	    	
			this.$el = $detail;
			
			this.frmUser = frmUser;
			
	    },
		
	    show: function (args) {
	    	
	        this.$el.show();
			
			if (args.id) {
				this.showUser(args);
			}
			else {
				this.newUser();
			}
			
	    },
	    
		showUser: function (data) {
			
			this.frmUser.setData(data);
			this.setStateEdit();
		},
		
		newUser: function () {
			this.setStateNew();
		},
		
		setStateEdit: function () {
			this.frmUser.setStateEdit();
		},
		
		setStateNew: function () {
			this.frmUser.setStateNew();
		},
		
	});

	detailPage.init();

	var winNarrow = {
	    
	    showPage: function (page, args) {
	    	
	        if (this.page != page) {
	            
	            this.page && this.page.hide();
	            
	            this.page = page;
	            
	            page.show(args);
	        }
	        
	    },
	    
	    init: function () {

	        listPage.appendTo($mainPanel);

	        detailPage.appendTo($mainPanel);

	        detailPage.hide();

	        this.page = listPage;

	    	return this;
	    },
	    
	};

	var winWide = {
	    
	    init: function () {
	    	listPage.appendTo($mainPanel);
	        detailPage.appendTo($detailPanel);
	        
	        detailPage.hide();

	        this.page = listPage;

	        return this;
	    },
	    
	    showPage: function (page, args) {
	    	
	        if (page == listPage) {
	            detailPage.hide();
	        }
	        else {
	            detailPage.show(args);
	        }
	        
	    },
	    
	};


	function isWide() {
		return 'none' != $detailPanel.css('display');
	}

	var win = isWide() ? winWide : winNarrow;

	win.init();

	var spa = {
	    
	    init: function () {
	    	
	        $w.on('hashchange', showUri);
	        
	        showUri();
	        
	    },
	    
	};

	function showUri() {
		
	    var map = $.uriAnchor.makeAnchorMap();
	    
		console.log(map);
		
	    switch (map.page) {
	        
	        case 'user':
	            
	            win.showPage(detailPage, map._page);
	            
	            break;
	        
	        case 'list':
	        default:    // if no page specified, show list: 
	            
	            win.showPage(listPage, map._page);
	            
	            break;
	    }
	    
	}

	spa.init();

}());
