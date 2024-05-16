type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;  //intersections similar to interfaces in the sense of combining to ElevatedEmployee

const e1: ElevatedEmployee = {
    name: 'Ed',
    privileges: ['create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean

//Type guards
function add(a:Combinable, b: Combinable) { 
    if(typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
 }

 type UnkownEmployee = Employee | Admin;

 function printEmployeeInformation(emp: UnkownEmployee) {
    console.log('Name: ' + emp.name);
    if('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('startDate: ' + emp.startDate);
    }
    
}

printEmployeeInformation({name: 'Manny', startDate: new Date()});

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // if ('loadCargo' in vehicle) {
    //     vehicle.loadCargo(1000);
    // }
    //instance of 
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// discriminating unions

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal:  Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
          speed = animal.flyingSpeed;
          break;
        case 'horse':
          speed = animal.runningSpeed;
          break;
    }
    console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

// type casting
// const userInputElement = <HTMLInputElement>document.getElementById('user-input!')!;
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

userInputElement.value = 'Hi there!';

// if you don't know if input value will be null you can do as below and remove last part on line 111 and delete line 113
if(userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}

/// index properties
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'not a valid email!',
    username: 'Must start with a capital character!'
}

//function overloads



// optional chaining


