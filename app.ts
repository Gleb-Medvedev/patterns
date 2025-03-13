// //ПАТТЕРНЫ ПРОЕКТИРОВАНИЯ НА ПРИМЕРАХ:

// --- 1)Фабрика (Fabric Method)
interface Venicle {
    drive(): string;
}

class Sedan implements Venicle {
    drive(): string {
        return 'Driving SEDAN!';
    }
}

class SUV implements Venicle {
    drive(): string {
        return 'Driving BIG SUV!';
    }
}

class VenicleFactory {
    static createVenicle(venicleType: string) {
        switch(venicleType) {
            case 'sedan':
                return new Sedan();
            case 'SUV':
                return new SUV();
            default:
                throw new Error('Такого транспортного средства нет!');
        }
    }
}

const newVenicle = VenicleFactory.createVenicle('SUV');
// console.log(newVenicle.drive());

// Определение:
// 1) интерфейс "Venicle" определяет свойства и/или методы, которые должны быть использованы (реализованы) КАЖДЫМ КЛАССОМ КОНКРЕТНОГО транспортного средства
// 2) Для каждого транспортного средства создаётся свой КЛАСС (Sedan или SUV), который реализует интерфейс "Venicle", с собственной реализацией метода "drive()", 
// 3) Класс VenicleFactory в параметре СТАТИЧЕСКОГО метода "createVenicle" принимает ТИП СОЗДАВАЕМОГО транспортного средства и конструкцией SWITCH/CASE в зависимости от этого типа транспортного средства возвращает ИНСТАНС соответствующего класса (Sedan или SUV)

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---2) Абстрактная фабрика

interface IChair {
    sitOnIt(): void;
}

interface ITable {
    eatOnIt(): void;
}

class ModernChair implements IChair {
    sitOnIt(): void {
        console.log('Сижу на СОВРЕМЕННОМ стуле!');
    }
}

class OldChair implements IChair {
    sitOnIt(): void {
        console.log('Сижу на СТАРИННОМ стуле!');
    }
}

class ModernTable implements ITable {
    eatOnIt(): void {
        console.log('ЕМ за СОВРЕМЕННЫМ столом!');
    }
}

class OldTable implements ITable {
    eatOnIt(): void {
        console.log('ЕМ за СТАРИННЫМ столом!');
    }
}

interface IFurniture {
    createChair(): IChair;
    createTable(): ITable;
}

class ModernFurnitureFactory implements IFurniture {
   createChair(): IChair {
       return new ModernChair();
   }

   createTable(): ITable {
       return new ModernTable();
   }
}

class OldFurnitureFactory implements IFurniture {
    createChair(): IChair {
        return new OldChair();
    }

    createTable(): ITable {
        return new OldTable();
    }
}

function selectFactory(factory: IFurniture) {
    const oldFactory = factory.createChair();
    const modernFactory = factory.createTable();

    oldFactory.sitOnIt();
    modernFactory.eatOnIt();
}

// selectFactory(new ModernFurnitureFactory());
// selectFactory(new OldFurnitureFactory());

//Определение:
// Интерфейсы "ITable" и "IChair" определяют свою будущую реализацию в классах и содержит общие свойства и/или методы для каждой конктерного товара (2 вида стульев и 2 столов).
// Для каждого типа абстракции (товара) создаётся класс, который для каждого товара реализует интерфейсы IChair и ITable с собственной реализацией методов из этих интерфейсов.
// Создаётся интерфейс для абстракной фабрики, который определяет методы для СОЗДАНИЯ СЕМЕЙСТВ каждой абстракции. (createChair() + createTable()) без их реализации;
// На каждое СЕМЕЙСТВО абстракции (товара) создаётся АБСТРАКТНАЯ ФАБРИКА, которая реализует все соответствующие ей методы из интерфейса (OldFactory создаёт новые инстанты для OLD стула и OLD стола, ModernFactory то же самое, но для MODERN стула и MODERN Стола)
// Функция selectFactory принимает параметром инстанс абстракной фабрики и использует её методы для создания ТОВАРОВ СООТВЕТСТВУЮЩЕГО СЕМЕЙСТВА...
// (selectFactory(new ModernFurnitureFactory)) создаст Modern Стул и Modern стол

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//---3)Строитель (Builder)

// class House {
//     floors: number;
//     garage: boolean;
//     pool: boolean;

//     constructor(builder: HouseBuilder) {
//         this.floors = builder.floors;
//         this.garage = builder.garage;
//         this.pool = builder.pool;
//     }

//     houseParams(): void {
//         console.log(`Дом построен со следующими параметрами: Этажи: ${this.floors}. Гараж: ${this.garage}. Бассейн: ${this.pool}`);
//     }
// }

// class HouseBuilder {
//     floors: number = 1;
//     garage: boolean = false;
//     pool: boolean = false;

//     setFloors(floors: number): HouseBuilder {
//         if ([1,2,3].includes(floors)) {
//             this.floors = floors;
//             return this;
//         } else if (floors === 0) {
//             throw new Error('ДОМ ВЫСОТОЙ НУЛЬ ЭТАЖЕЙ? ДОСТОЙНО!');
//         } else {
//             throw new Error('МЫ НЕ СТРОИМ ДОМА ВЫШЕ 3-Х (ТРЁХ) ЭТАЖЕЙ!');
//         }
//     }

//     setGarage(): HouseBuilder {
//         this.garage = true;
//         return this;
//     }

//     setPool(): HouseBuilder {
//         this.pool = true;
//         return this;
//     }

//     buildHouse(): House {
//         return new House(this);
//     }
// }

// const buildHouse = new HouseBuilder();

// console.log(buildHouse
//     .setFloors(0)
//     .setGarage()
//     .setPool());

// Определение:
// Необходимы 2 Класса - ЦЕЛЕВОЙ, который мы БУДЕМ создавать в виде инстанса и СТРОИТЕЛЬ этого целевого класса.
// В конструктор ЦЕЛЕВОГО класса передаётся тип - КЛАСС СТРОИТЕЛЯ. Это нужно для инициализации свойств СОЗДАВАЕМОГО КЛАССА.
// Класс HouseBuilder - это строитель, который содержит методы для изменения значений свойств СОЗДАВАЕМОГО класса.
// Каждый метод экзепляра строителя возвращает THIS ПОСЛЕ изменения значений свойств СОЗДАВАЕМОГО целевого класса.
// Метод "buildHouse" возвращает новый инстанс СОЗДАВАЕМОГО КЛАССА, используя текущие значения из СТРОИТЕЛЯ
// Для работы мы создаём новый инстанс СТРОИТЕЛЯ, а после в его методы для изменения свойств СОЗДАВАЕМОГО класса передаём требуемые агрументы и/или просто вызываем нужный метод для изменения значений свойств.
// Значения свойств выводятся в СОЗДАВАЕМОМ КЛАССЕ методом "houseParams"

interface IHouseBuilder {
    setFloors(floors: number): IHouseBuilder;
    setGarage(): IHouseBuilder;
    setPool(): IHouseBuilder;
    buildHouse(): House;
}

class House {
    floors: number;
    garage: boolean;
    pool: boolean;

    constructor(builder: IHouseBuilder) {
        const b = builder as HouseBuilder;
        this.floors = b.floors;
        this.garage = b.garage;
        this.pool = b.pool;
    }

    houseParams(): void {
        console.log(`Дом построен со следующими параметрами: этажей: ${this.floors} | гараж: ${this.garage} | бассейн: ${this.pool}`);
    }
}

class HouseBuilder implements IHouseBuilder {
    floors: number = 1;
    garage: boolean = false;
    pool: boolean = false;

    setFloors(floors: number): IHouseBuilder {
        if (![1,2,3].includes(floors)) {
            throw new Error('Дом должен иметь от 1 до 3-х этажей!');
        }
        this.floors = floors;
        return this;
    }

    setGarage(): IHouseBuilder {
        this.garage = true;
        return this;
    }

    setPool(): IHouseBuilder {
        this.pool = true;
        return this;
    }

    buildHouse(): House {
        return new House(this);
    }
}

const newHouseBuilder = new HouseBuilder();
console.log(newHouseBuilder
                .setFloors(2)
                .setGarage()
                .setPool()
);

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---4) Прототип (Prototype)

interface IProto<T> {
    clone(): T;
}

class Product implements IProto<Product> {
    constructor(public name: string, public price: number) {}

    clone(): Product {
        return new Product(this.name, this.price);
    }

    productInfo(): void {
        console.log(`Продукт с названием ${this.price} и ценой ${this.price}`);        
    }
}

const newProduct = new Product('Telefon', 228);

const cloneOfAProduct = newProduct.clone();
console.log(`Клонированный объект: ${cloneOfAProduct}`);

cloneOfAProduct.name = 'NOUTBUK';
cloneOfAProduct.price = 289356289;

console.log('Оригинал: ', newProduct, 'Копия: ', cloneOfAProduct);

// Описание:
// интерфейс "IProto" отпределяет метод "clone(): <T>" для копирования объекта БЕЗ РЕАЛИЗАЦИИ
// Дженерик <T> "приходит" из интерфейса IProto<T>, который мы указываем при реализации этого интерфейса у класса "Product";
// Вызов метода "сlone()" у СОЗДАННОГО ИНСТАНСА класса  создаёт и возвращает копию НОВОГО объекта с полями и значениями из РАНЕЕ ПЕРЕДАННЫХ ПАРАМЕТРОВ из ОРИГИНАЛЬНОГО ИНСТАНСА Класса. 