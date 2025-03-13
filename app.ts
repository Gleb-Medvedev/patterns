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

interface Chair {
    sitOnIt(): void;
}

interface Table {
    eatOnIt(): void;
}

class ModernChair implements Chair {
    sitOnIt(): void {
        console.log('Сижу на СОВРЕМЕННОМ стуле!');
    }
}

class OldChair implements Chair {
    sitOnIt(): void {
        console.log('Сижу на СТАРИННОМ стуле!');
    }
}

class ModernTable implements Table {
    eatOnIt(): void {
        console.log('ЕМ за СОВРЕМЕННЫМ столом!');
    }
}
class OldTable implements Table {
    eatOnIt(): void {
        console.log('ЕМ за СТАРИННЫМ столом!');
    }
}

interface IFurniture {
    createChair(): Chair;
    createTable(): Table;
}

class ModernFurnitureFactory implements IFurniture {
   createChair(): Chair {
       return new ModernChair();
   }

   createTable(): Table {
       return new ModernTable();
   }
}

class OldFurnitureFactory implements IFurniture {
    createChair(): Chair {
        return new OldChair();
    }

    createTable(): Table {
        return new OldTable();
    }
}

function clientCode(factory: IFurniture) {
    const chair = factory.createChair();
    const table = factory.createTable();

    chair.sitOnIt();
    table.eatOnIt();
}

console.log(clientCode(new ModernFurnitureFactory()));
