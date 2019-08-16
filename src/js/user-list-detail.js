import page from './user-list-page.js';
import { $detail } from './user-list-dom.js';

import frmUser from './user-list-detail-form.js'

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

export default detailPage;




