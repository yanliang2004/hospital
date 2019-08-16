
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

export default page;