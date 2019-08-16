import { $w } from './user-list-dom.js';

import listPage from './user-list-list.js';
import detailPage from './user-list-detail.js';

import win from './user-list-win.js';


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



export default spa;
