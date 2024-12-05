import { map, take, interval,filter, switchMap,concatMap,mergeMap } from 'rxjs';
import axios from "axios";
//#1
class Car {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;

  constructor(n: string, m: string, year: number, b: string, c: string) {
    this.name = n;
    this.model = m;
    this.brand = b;
    this.yearOfRelease = year;
    this.color = c;
  }
}
class Scrap{
  name:string;
  yearOfRelease:number;

  constructor(name:string,year:number)
  {
    this.name=name;
    this.yearOfRelease=year;
  }
}
const getRandomCar = (): Car => {
  const names = ['Corolla', 'Civic', 'Mustang', 'Model S', 'Charger'];
  const models = ['XLI', 'EX', 'GT', 'Plaid', 'R/T'];
  const brands = ['Toyota', 'Honda', 'Ford', 'Tesla', 'Dodge'];
  const colors = ['Red', 'Blue', 'Black', 'White', 'Silver'];

  return new Car(
    names[Math.floor(Math.random() * names.length)],
    models[Math.floor(Math.random() * models.length)],
    Math.floor(Math.random()*2024), // Random year between 2000 and 2023
    brands[Math.floor(Math.random() * brands.length)],
    colors[Math.floor(Math.random() * colors.length)]
  );
};

const observable1 = interval(1000).pipe(
  map(() => getRandomCar()),  // Generate a random car every second
  take(10)                    // Take 10 values and then complete the stream
);

// #2
// observable.subscribe(
//   (c) => console.log(c) // Log each car object to the console
// );
const observable2 = observable1.pipe(
    filter((m:Car) =>( m.color.toLowerCase() === 'black' && m.yearOfRelease < 2000)) 
  );
  
//   #3
// observable2.subscribe(c=>console.log(c));
const observable3=observable2.pipe(
 map((c:Car)=>{
  return new Scrap(c.brand,c.yearOfRelease)
 })
);


// #4
// observable3.subscribe(c=>{console.log(c)});


// #5
const fetchData = async (): Promise<void> => {
  return await axios.get("https://dummyjson.com/products")
    .then(response => response.data)
    .catch((error) => console.error(error))
};


const observable4=interval(1000).pipe(switchMap(() => {
  return fetchData()
}));
// observable4.subscribe(c=>console.log(c));

// #6
const observable5 = interval(100).pipe(
  concatMap(() => fetchData()) 
);
// observable5.subscribe(c=>console.log(c));

const observable6 = interval(50).pipe(
  mergeMap(() => fetchData()),
  take(5) 
);
observable6.subscribe(c=>console.log(c));