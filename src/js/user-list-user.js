import { $userTmpl } from './user-list-dom.js';

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

export default User;
