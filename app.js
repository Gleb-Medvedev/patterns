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
function selectFactory(factory) {
    var oldFactory = factory.createChair();
    var modernFactory = factory.createTable();
    oldFactory.sitOnIt();
    modernFactory.eatOnIt();
}
var House = /** @class */ (function () {
    function House(builder) {
        var b = builder;
        this.floors = b.floors;
        this.garage = b.garage;
        this.pool = b.pool;
    }
    House.prototype.houseParams = function () {
        console.log("\u0414\u043E\u043C \u043F\u043E\u0441\u0442\u0440\u043E\u0435\u043D \u0441\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C\u0438: \u044D\u0442\u0430\u0436\u0435\u0439: ".concat(this.floors, " | \u0433\u0430\u0440\u0430\u0436: ").concat(this.garage, " | \u0431\u0430\u0441\u0441\u0435\u0439\u043D: ").concat(this.pool));
    };
    return House;
}());
var HouseBuilder = /** @class */ (function () {
    function HouseBuilder() {
        this.floors = 1;
        this.garage = false;
        this.pool = false;
    }
    HouseBuilder.prototype.setFloors = function (floors) {
        if (![1, 2, 3].includes(floors)) {
            throw new Error('Дом должен иметь от 1 до 3-х этажей!');
        }
        this.floors = floors;
        return this;
    };
    HouseBuilder.prototype.setGarage = function () {
        this.garage = true;
        return this;
    };
    HouseBuilder.prototype.setPool = function () {
        this.pool = true;
        return this;
    };
    HouseBuilder.prototype.buildHouse = function () {
        return new House(this);
    };
    return HouseBuilder;
}());
var newHouseBuilder = new HouseBuilder();
console.log(newHouseBuilder
    .setFloors(2)
    .setGarage()
    .setPool());
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    Product.prototype.clone = function () {
        return new Product(this.name, this.price);
    };
    Product.prototype.productInfo = function () {
        console.log("\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C ".concat(this.price, " \u0438 \u0446\u0435\u043D\u043E\u0439 ").concat(this.price));
    };
    return Product;
}());
var newProduct = new Product('Telefon', 228);
var cloneOfAProduct = newProduct.clone();
console.log("\u041A\u043B\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442: ".concat(cloneOfAProduct));
cloneOfAProduct.name = 'NOUTBUK';
cloneOfAProduct.price = 289356289;
console.log('Оригинал: ', newProduct, 'Копия: ', cloneOfAProduct);
// Описание:
// интерфейс "IProto" отпределяет метод "clone(): <T>" для копирования объекта БЕЗ РЕАЛИЗАЦИИ
// Дженерик <T> "приходит" из интерфейса IProto<T>, который мы указываем при реализации этого интерфейса у класса "Product";
// Вызов метода "сlone()" у СОЗДАННОГО ИНСТАНСА класса  создаёт и возвращает копию НОВОГО объекта с полями и значениями из РАНЕЕ ПЕРЕДАННЫХ ПАРАМЕТРОВ из ОРИГИНАЛЬНОГО ИНСТАНСА Класса. 
