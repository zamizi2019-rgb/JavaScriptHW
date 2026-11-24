console.log('Start! File is connected :D');

class Animal { 
	constructor(name, age) {
		if (typeof name !== 'string' || name.trim().length === 0) {
			throw new Error('Name can not be empty');
		}
		if (age < 0) {
			throw new RangeError('Age can not be negative');
		}
		this.name = name;
		this.age = age;
	}

	info() {
		return `${this.name}, ${this.age} years old`;
	}

	voice() {
		return 'No specified voice';
	}

	speak() {
		return `${this.name}: ${this.voice()}`;
	}
}

class Cat extends Animal {
	voice() {
		return 'Meow';
	}
}

class Dog extends Animal {
	constructor(name, age, breed) {
		super(name, age);
		this.breed = breed;
	}

	voice() {
		return 'Woof';
	}

	info() {
		return super.info() + ', ' + this.breed;
	}
}

class Parrot extends Animal {
	constructor(name, age, word) {
		super(name, age);
		this.word = word;
	}

	voice() {
		return `${this.word} ${this.word}`;
	}
}

class ZooError extends Error {
	constructor(message = 'Zoo error') {
		super(message);
		this.name = 'ZooError';
	}
}

class Zoo {
	#animals = [];

	add(animal) {
		if (!(animal instanceof Animal)) {
			throw new ZooError('This is not an animal');
		}
		const exists = this.#animals.some(
			(item) => item.name.toLowerCase() === animal.name.toLowerCase()
		);
		if (exists) {
			throw new ZooError(`${animal.name} already exists`);
		}
		this.#animals.push(animal);
		console.log(`${animal.name} added to the zoo`);
	}

	get size() {
		return this.#animals.length;
	}

	oldest() {
		let result = this.#animals[0];

		for (const animal of this.#animals) {
			if (animal.age > result.age) {
				result = animal;
			}
		}

		return result;
	}
}
//Rabota koda
const cat = new Cat('Barsik', 3);
const dog = new Dog('Rex', 5, 'shepherd');
const parrot = new Parrot('Kesha', 2, 'Hello!');

console.log(cat.info() + ' | ' + dog.info());
console.log(cat.speak());
console.log(dog.speak());
console.log(cat instanceof Animal);

const animals = [cat, dog, parrot];

try {
	for (const animal of animals) {
		console.log(animal.speak());
	}
	animals.push(new Cat('', 1)); // koshka bez imeni proverka
} 
catch (err) {
	console.log('Error: ' + err.message);
} 
finally {
	console.log('Check completed');
}

//zoopark

const zoo = new Zoo();
const attempts = [cat, dog, cat, { name: 'Stone' }];
for (const item of attempts) {
	try {
		zoo.add(item);
	} 
    catch (err) {
		console.log(`${err.name}: ${err.message}`);
	}
}

console.log(`Animals: ${zoo.size} | Oldest: ${zoo.oldest().name}`);
console.log(parrot instanceof Animal);
