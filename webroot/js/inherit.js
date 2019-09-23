function Parent(name) {
    this.name = name;
}

Parent.prototype.say = function () {
    console.log(this.name);
};

function inherit(C, P) {
    function F() {}
    F.prototype = P.prototype;
    C.prototype = new F();
}

function Child(name) {
    
}

inherit(Child, Parent);

function klass(P, implement) {
    
    function F() {}

    P && (F.prototype = P.prototype);

    function C() {
        implement.__construct &&
            implement.__construct.apply(this, arguments);

        
    }

    C.prototype = new F();
    C.prototype.constructor = C;

    for (var k in implement) {
        C.prototype[k] = implement[k];
    }

    return C;
}


var Car = function () {
    
    function Car() { }

    Car.prototype.drive = function () {
        return 'I have ' + this.doors + ' doors.';
    };

    Car.make = function (type) {
        
        Car[type].prototype = new Car();

        return new Car[type]();

    };

    Car.Compact = function () {
        this.doors = 4;
    };
    Car.Convertible = function () {
        this.doors = 2;
    };
    Car.SUV = function () {
        this.doors = 5;
    };

    return Car;

}();

var compact = Car.make('Compact'),
    conv = Car.make('Convertible'),
    suv = Car.make('SUV');

compact.drive();
conv.drive();
suv.drive();

