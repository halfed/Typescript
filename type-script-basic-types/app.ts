function add(n1: number, n2: number) {
		return n1 + n2
};

const number1 = 5;
const number2 = 2.8;

const result = add(number1, number2);
console.log(result)


////// BASICS OBJECTS
// could do this but better to do
// const person: {
//     name: string; 
//     age: number;
// } = {
//     name: 'Ed Wince',
//     age: 51
// };
const person = {
		name: 'Ed Wince',
		age: 51
};

console.log(person.name);

//// ARRAYS 
const person2 = {
		name: 'Ed Wince',
		age: 51,
		hobbies: ['Sports', 'Cooking']
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

for(const hobby of person2.hobbies) {
	console.log(hobby);
}

//// TUPLES FIXED LENGTH ARRAY AND FIXED TYPE
const person3: {
	name: string;
	age: number;
	hobbies: string[];
	role: [number, string];
} = {
	name: 'Ed Wince',
	age: 51,
	hobbies: ['Sports', 'Cooking'],
	role: [2, 'author']
}

person3.role.push('admin');
person3.role[1] = '10';

//// ENUM TYPES enum {NEW, OLD}
const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;
enum Role {
	ADMIN = 'ADMIN', READ_ONLY = 'READ_ONLY', AUTHOR = 'AUTHOR'
};

const person4 = {
	name: 'Ed Wince',
	age: 51,
	hobbies: ['Sports', 'Cooking'],
	role: Role.ADMIN
}

if (person4.role === 'ADMIN') {
	console.log('is admin')
}


//// UNION TYPES 
function combine(
	input1: number | string,
	input2: number | string
) {
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number') {
		result = input1 + input2;
	} else {
		result = input1.toString() + input2.toString();
	}
	// WITH UNION OF FIRST INPUT1 NUMBER | STRING BELOW FAILS BUT WE CAN WORK AROUND
	// WITH A CHECK ABOVE
	// const result = input1.toString() + input2.toString();
	
	return result;
};

const combineAges = combine(30, 26);
console.log(combineAges);

const combineNames = combine('Ed', 'Wince');
console.log(combineNames);


//// LITERAL TYPES
function combine2(
	input1: number | string,
	input2: number | string,
	// LITERAL TYPE BELOW
	resultConversion: 'as-number' | 'as-text'
) {
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number'
		|| resultConversion === 'as-number') {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}
	// WITH UNION OF FIRST INPUT1 NUMBER | STRING BELOW FAILS BUT WE CAN WORK AROUND
	// WITH A CHECK ABOVE
	// const result = input1.toString() + input2.toString();
	
	return result;
};

const combineAges2 = combine2(30, 26, 'as-number');
console.log(combineAges2);

const combineAges3 = combine2('30', '26', 'as-number');
console.log(combineAges3);

const combineNames2 = combine2('Ed', 'Wince', 'as-text');
console.log(combineNames2);









