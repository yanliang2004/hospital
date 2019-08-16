import { $mainPanel, $detailPanel } from './user-list-dom.js';

import listPage from './user-list-list.js';
import detailPage from './user-list-detail.js';

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

export default win;
