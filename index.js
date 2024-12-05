"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const axios_1 = __importDefault(require("axios"));
//#1
class Car {
    constructor(n, m, year, b, c) {
        this.name = n;
        this.model = m;
        this.brand = b;
        this.yearOfRelease = year;
        this.color = c;
    }
}
class Scrap {
    constructor(name, year) {
        this.name = name;
        this.yearOfRelease = year;
    }
}
const getRandomCar = () => {
    const names = ['Corolla', 'Civic', 'Mustang', 'Model S', 'Charger'];
    const models = ['XLI', 'EX', 'GT', 'Plaid', 'R/T'];
    const brands = ['Toyota', 'Honda', 'Ford', 'Tesla', 'Dodge'];
    const colors = ['Red', 'Blue', 'Black', 'White', 'Silver'];
    return new Car(names[Math.floor(Math.random() * names.length)], models[Math.floor(Math.random() * models.length)], Math.floor(Math.random() * 2024), // Random year between 2000 and 2023
    brands[Math.floor(Math.random() * brands.length)], colors[Math.floor(Math.random() * colors.length)]);
};
const observable1 = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.map)(() => getRandomCar()), // Generate a random car every second
(0, rxjs_1.take)(10) // Take 10 values and then complete the stream
);
// #2
// observable.subscribe(
//   (c) => console.log(c) // Log each car object to the console
// );
const observable2 = observable1.pipe((0, rxjs_1.filter)((m) => (m.color.toLowerCase() === 'black' && m.yearOfRelease < 2000)));
//   #3
// observable2.subscribe(c=>console.log(c));
const observable3 = observable2.pipe((0, rxjs_1.map)((c) => {
    return new Scrap(c.brand, c.yearOfRelease);
}));
// #4
// observable3.subscribe(c=>{console.log(c)});
// #5
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get("https://dummyjson.com/products")
        .then(response => response.data)
        .catch((error) => console.error(error));
});
const observable4 = (0, rxjs_1.interval)(1000).pipe((0, rxjs_1.switchMap)(() => {
    return fetchData();
}));
// observable4.subscribe(c=>console.log(c));
// #6
const observable5 = (0, rxjs_1.interval)(100).pipe((0, rxjs_1.concatMap)(() => fetchData()));
// observable5.subscribe(c=>console.log(c));
const observable6 = (0, rxjs_1.interval)(50).pipe((0, rxjs_1.mergeMap)(() => fetchData()), (0, rxjs_1.take)(5));
observable6.subscribe(c => console.log(c));
