// //ПАТТЕРНЫ ПРОЕКТИРОВАНИЯ НА ПРИМЕРАХ:
var Sedan = /** @class */ (function () {
    function Sedan() {
    }
    Sedan.prototype.drive = function () {
        return 'Driving SEDAN!';
    };
    return Sedan;
}());
var SUV = /** @class */ (function () {
    function SUV() {
    }
    SUV.prototype.drive = function () {
        return 'Driving BIG SUV!';
    };
    return SUV;
}());
var VenicleFactory = /** @class */ (function () {
    function VenicleFactory() {
    }
    VenicleFactory.createVenicle = function (venicleType) {
        switch (venicleType) {
            case 'sedan':
                return new Sedan();
            case 'SUV':
                return new SUV();
            default:
                throw new Error('Такого транспортного средства нет!');
        }
    };
    return VenicleFactory;
}());
var newVenicle = VenicleFactory.createVenicle('SUV');
var ModernChair = /** @class */ (function () {
    function ModernChair() {
    }
    ModernChair.prototype.sitOnIt = function () {
        console.log('Сижу на СОВРЕМЕННОМ стуле!');
    };
    return ModernChair;
}());
var OldChair = /** @class */ (function () {
    function OldChair() {
    }
    OldChair.prototype.sitOnIt = function () {
        console.log('Сижу на СТАРИННОМ стуле!');
    };
    return OldChair;
}());
var ModernTable = /** @class */ (function () {
    function ModernTable() {
    }
    ModernTable.prototype.eatOnIt = function () {
        console.log('ЕМ за СОВРЕМЕННЫМ столом!');
    };
    return ModernTable;
}());
var OldTable = /** @class */ (function () {
    function OldTable() {
    }
    OldTable.prototype.eatOnIt = function () {
        console.log('ЕМ за СТАРИННЫМ столом!');
    };
    return OldTable;
}());
var ModernFurnitureFactory = /** @class */ (function () {
    function ModernFurnitureFactory() {
    }
    ModernFurnitureFactory.prototype.createChair = function () {
        return new ModernChair();
    };
    ModernFurnitureFactory.prototype.createTable = function () {
        return new ModernTable();
    };
    return ModernFurnitureFactory;
}());
var OldFurnitureFactory = /** @class */ (function () {
    function OldFurnitureFactory() {
    }
    OldFurnitureFactory.prototype.createChair = function () {
        return new OldChair();
    };
    OldFurnitureFactory.prototype.createTable = function () {
        return new OldTable();
    };
    return OldFurnitureFactory;
}());
function clientCode(factory) {
    var chair = factory.createChair();
    var table = factory.createTable();
    chair.sitOnIt();
    table.eatOnIt();
}
console.log(clientCode(new ModernFurnitureFactory()));
