import 'reflect-metadata';
// import { plainToInstance } from 'class-transformer';

import { Product } from './product.model';
import { plainToClass } from '../node_modules/class-transformer/index';
import { validate } from 'class-validator';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 },
  { title: 'A Vibrator', price: 87.99 }
];

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  if(errors.length > 0) {
    console.log('VALIDATION ERRORS');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const p1 = new Product('A Book', 12.99);

// console.log(p1.getInformation());

// THIS IS THE VANILLA WAY TO MAP THROUGH A JSON OBJECT
// WITH CLASS-TRANSFORM WE CAN USE BELOW
// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// const loadedProducts = plainToInstance(Product, products);


