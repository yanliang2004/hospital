var espresso = {
    cost: function () {
        return 1.99;
    },
    description: function () {
        return 'espresso';
    },
};

function mocha(beverage) {

    return {
        cost: function () {
            return 0.2 + beverage.cost();
        },
        description: function () {
            return beverage.description() + ', Mocha';
        },
    };
}

function milk(beverage) {
    
    return {
        cost: function () {
            return 0.3 + beverage.cost();
            
        },
        description: function () {
            return beverage.description() + ', Milk';
        },
    };
}


function Sale(price) {
    this.price = price;
    this.getPrice = function () {
        return this.price;
    }
}

function fedtax(sale) {
    return {
        getPrice: function () {
            return sale.getPrice()  * 1.05;
        }
    };
}

function quebec(sale) {
    return {
        getPrice: function () {
            return sale.getPrice() * 1.075;
        },
    }
}





