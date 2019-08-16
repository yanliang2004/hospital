
function A() {
	this.virtualFunc();
}

A.prototype.virtualFunc = function () {
	alert('A');
};

function B() {
	A.call(this);
}

B.prototype = new A();

B.prototype.virtualFunc = function () {
	alert('B');
};

var b = new B();


