
function checkValue(value,min = 0,max = 10) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function emoji(mood) {
  return mood >= 7 ? ':D' : mood >= 4 ? ':)' : ':(';
}

function sleep(hours) {
  if (hours <= 0) {
    return;
  }
  console.log('Zzz...');
  sleep(hours - 1);
}

function stats(...turns) {
  let message = 'Turns lived by each pet:\n';
  for (let i = 0; i < turns.length; i++) {
    message += 'Pet ' + (i + 1) + ': ' + turns[i] + ' turns\n';
  }
  return message;
}

function createPet(name) {
  let food = 5;
  let mood = 5;
  let turns = 0;
  let isGone = false;

  function pet(command,hours) {
    if (command === 'turns') {
      return turns;
    }
    if (command === 'isGone') {
      return isGone;
    }

    if (isGone) {
      return name + ' has left and will not come back';
    }

    switch (command) {
      case 'feed':
        food = checkValue(food + 4);
        break;
      case 'play':
        mood = checkValue(mood + 3);
        break;
      case 'sleep':
        if (!Number.isInteger(hours) || hours < 1 || hours > 24) {
          return 'Enter a whole number of hours from 1 to 24';
        }
        sleep(hours);
        break;
      case 'status':
        break;
      default:
        return 'Unknown command';
    }

    if (command !== 'status') {
      turns = turns + 1;
      food = checkValue(food - 1);
    }

    if (food === 0) {
      isGone = true;
      return name + ' got upset and left .__.';
    }

    return name + ': satiety ' + food + ', mood ' + mood + ' ' + emoji(mood);
  }

  return pet;
}

const pets = [];

function addPet() {
  const name = prompt('Enter a name for the new pet:');
  if (name === null || name.trim() === '') {
    alert('No name entered');
    return;
  }
  pets.push({ name: name.trim(), pet: createPet(name.trim()) });
  alert('Pet ' + name.trim() + ' was created!');
}

function choosePet() {
  let message = 'Choose a pet:\n';
  for (let i = 0; i < pets.length; i++) {
    message += (i + 1) + ' - ' + pets[i].name + '\n';
  }
  const petNumber = Number(prompt(message));

  if (!Number.isInteger(petNumber) || petNumber < 1 || petNumber > pets.length) {
    alert('Invalid choice');
    return null;
  }
  return pets[petNumber - 1];
}

function playWith(selectedPet) {
  while (true) {
    const userChoice = prompt(
      'What do we do with ' + selectedPet.name + '?\n' +
      '1 - feed\n' +
      '2 - play\n' +
      '3 - status\n' +
      '4 - sleep\n' +
      '0 - back'
    );
    if (userChoice === null || userChoice === '0') {
      return;
    }

    let result;
    switch (userChoice) {
      case '1':
        result = selectedPet.pet('feed');
        break;
      case '2':
        result = selectedPet.pet('play');
        break;
      case '3':
        result = selectedPet.pet('status');
        break;
      case '4':
        const hours = Number(prompt('How many hours should it sleep?'));
        result = selectedPet.pet('sleep', hours);
        break;
      default:
        result = 'Invalid command';
    }
    alert(result);

    if (selectedPet.pet('isGone')) {
      return;
    }
  }
}

function showStats() {
  const petTurns = [];
  for (let i = 0; i < pets.length; i++) {
    petTurns.push(pets[i].pet('turns'));
  }
  alert(stats(...petTurns));
}

function main() {
  alert('Welcome, first, we need to create two pets(EX: Tima,Elxan)');
  addPet();
  addPet();

  while (true) {
    const userChoice = prompt(
      'Main menu:\n' +
      '1 - play with a pet\n' +
      '2 - add a new pet\n' +
      '3 - show stats\n' +
      '0 - exit'
    );
    if (userChoice === null || userChoice === '0') {
      break;
    }

    if (userChoice === '1') {
      const selectedPet = choosePet();
      if (selectedPet) {
        playWith(selectedPet);
      }
    } else if (userChoice === '2') {
      addPet();
    } else if (userChoice === '3') {
      showStats();
    } else {
      alert('Invalid command');
    }
  }

  showStats();
  alert('Goodbye!');
}

main();
