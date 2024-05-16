type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
  subRows?: Person[];
};

const getRandomFirstName = () => {
  // Array of random first names
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Eve', 'Michael', 'Emily', 'David', 'Sarah', 'William'];
  // Return a random first name from the array
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomLastName = () => {
  // Array of random last names
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
  // Return a random last name from the array
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const getRandomStatus = () => {
  // Array of status options
  const statusOptions = ['single', 'complicated', 'relationship'];
  // Return a random status from the array
  return statusOptions[Math.floor(Math.random() * statusOptions.length)];
};

const getRandomPerson = () => {
  // Generate a random person object
  return {
    firstName: getRandomFirstName(),
    lastName: getRandomLastName(),
    age: Math.floor(Math.random() * 30), // Random age between 0 and 29
    visits: Math.floor(Math.random() * 100), // Random number of visits between 0 and 99
    progress: Math.floor(Math.random() * 100), // Random progress between 0 and 99
    status: getRandomStatus()
  };
};

export default function makeData(...lens: number[]) {
  const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };

  const makeDataLevel = (depth = 0): Person[] => {

    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...getRandomPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
