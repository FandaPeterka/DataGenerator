/**
 * File Header: Employee Data Generator
 * 
 * Description:
 * This script is designed to generate random employee data, including names, surnames,
 * birth dates, and workloads. The script also provides an interactive CLI (Command Line Interface) 
 * for user interaction to select input data.
 * 
 * Author: František Peterka
 * Created: 2023-11-07
 * Last Updated: 2023-11-08
 * 
 * Usage:
 * Run the script in a Node.js environment with ES6 support.
 * The script can be modified for integration into larger applications or for specific user-defined usage.
 * 
 * External Dependencies:
 * - Node.js readline module for CLI interactions.
 * 
 * Note:
 * This script is intended for demonstration and educational purposes only. The generated data
 * is random and does not contain information about real individuals.
 * If invalid input is provided in the command line, the script will restart, and inputs must be re-entered.
 */


//-------------------------------------------------------------//
// Helper Functions for Employee Generation //
//-------------------------------------------------------------//
/**
 * Generates a random integer within a specified range.
 * @param {number} min - Lower limit of the range (inclusive).
 * @param {number} max - Upper limit of the range (inclusive).
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Determines if a given year is a leap year.
 * @param {number} year - The year to check.
 * @returns {boolean} True if the year is a leap year, otherwise false.
 */
function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Generates a random birthdate considering month lengths and leap years.
 * @param {number} minAge - Minimum age.
 * @param {number} maxAge - Maximum age.
 * @returns {string} A date in ISO 8601 format matching the randomly generated age.
 */
function getRandomDate(minAge, maxAge) {
    const currentYear = new Date().getFullYear();
    const year = getRandomInt(currentYear - maxAge, currentYear - minAge);
    const month = getRandomInt(1, 12).toString().padStart(2, '0');
    
    // Gets the number of days in the month, considering leap years
    const daysInMonth = month === '02' ? (isLeapYear(year) ? 29 : 28) :
                    ['04', '06', '09', '11'].includes(month) ? 30 : 31;
    
    const day = getRandomInt(1, daysInMonth).toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
}

  //--------------------------------------------------------------//
  // Main Employee Generation Function //
  //--------------------------------------------------------------//
/**
 * Generates random employee data, including name, surname, birthdate, and workload.
 * @param {number} minAge - Minimum age for generating the birthdate.
 * @param {number} maxAge - Maximum age for generating the birthdate.
 * @param {Object} names - Object containing arrays of names divided by gender.
 * @param {Object} surnames - Object containing arrays of surnames divided by gender.
 * @param {number[]} workloads - Array of possible workloads.
 * @returns {Object} An object containing randomly generated employee data.
 * @example
 * returns { gender: 'male', name: 'Jan', surname: 'Novak', birthdate: '1990-05-21T00:00:00.000Z', workload: 40 }
 */
function generateEmployeeData(minAge, maxAge, names, surnames, workloads) {
    // Randomly assigns gender with a 50% probability of male or female.
    const gender = Math.random() > 0.5 ? 'male' : 'female';

    // Selects a random first name from the list corresponding to the gender.
    const name = names[gender][Math.floor(Math.random() * names[gender].length)];

    // Selects a random surname from the list corresponding to the gender.
    const surname = surnames[gender][Math.floor(Math.random() * surnames[gender].length)];

    // Uses a helper function to generate a random birthdate.
    const birthdate = getRandomDate(minAge, maxAge);

    // Randomly selects a workload from the provided list.
    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    // Creates and returns an object with the employee's data.
    return { gender, name, surname, birthdate, workload };
}

//--------------Main Function Containing Lists and Combining Code for a Single Output-----------------//

/**
 * Main function for generating employee data and their statistics.
 * @param {Object} dtoIn - Input object with parameters for data generation.
 */
function main(dtoIn) {
    // Define specific lists of first and last names for males and females.
    const maleNames = ["Jan", "Jiri", "Petr", "Pavel", "Martin", "Tomas", "Lukas", "Milan", "David", "Ondrej", "Jakub", "Roman", "Josef", "Marek", "Michal", "Daniel", "Vaclav", "Karel", "Ladislav", "Filip"];
    
    const femaleNames = ["Jana", "Eva", "Anna", "Hana", "Lenka", "Petra", "Lucie", "Tereza", "Martina", "Katerina", "Alena", "Monika", "Marie", "Pavlina", "Jaroslava", "Veronika", "Ludmila", "Helena", "Renata", "Michaela"];
    
    const maleSurnames = ["Novak", "Svoboda", "Novotny", "Dvorak", "Cerny", "Prochazka", "Kucera", "Vesely", "Horak", "Nemec", "Pokorny", "Marek", "Pospisil", "Hajek", "Jelinek", "Pavlik", "Kral", "Ruzicka", "Benes", "Fiala"];
    
    const femaleSurnames = ["Novakova", "Svobodova", "Novotna", "Dvorakova", "Cerna", "Prochazkova", "Kucerova", "Vesela", "Horakova", "Nemcova", "Pokorna", "Markova", "Pospisilova", "Hajkova", "Jelinkova", "Pavlikova", "Kralova", "Ruzickova", "Benesova", "Fialova"];
    
    const workloads = [10, 20, 30, 40]; // Possible workloads.

    // Structures for selecting names and surnames based on gender.
    const names = { male: maleNames, female: femaleNames };
    const surnames = { male: maleSurnames, female: femaleSurnames };

    // Initialize an array to collect employee data.
    const employees = [];
    
    // Generate employee data based on the count specified in dtoIn.
    for (let i = 0; i < dtoIn.count; i++) {
        employees.push(generateEmployeeData(dtoIn.age.min, dtoIn.age.max, names, surnames, workloads));
    }

    // Combined results as output.
    const dtoOut = employees

    return dtoOut 
}

//---------------------------------------------------//
// Interactive Section for Gathering User Inputs //
//---------------------------------------------------//

// Import required modules for interactive input/output.
const readline = require('readline').createInterface({
    input: process.stdin,  // 'stdin' allows reading data entered by the user
    output: process.stdout // 'stdout' allows outputting data to the user
});

/**
 * Checks if the input value is a positive number.
 * @param {string} value - The input value.
 * @returns {boolean} - True if the value is a positive number; otherwise false.
 */
function isPositiveNumber(value) {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0;
}

/**
 * Checks if the age is within a valid range (18 to 100 years).
 * @param {number} age - The entered age.
 * @returns {boolean} - True if the age is within the valid range; otherwise false.
 */
function isValidAge(age) {
    return age >= 18 && age <= 100;
}

/**
 * Interactive part of the program to gather user inputs necessary for employee generation.
 */
function getUserInputs() {
    readline.question('Enter the minimum employee age (18-100): ', minAge => {
        minAge = parseInt(minAge);
        if (!isPositiveNumber(minAge) || !isValidAge(minAge)) {
            console.error('Minimum age must be a positive number between 18 and 100. Please try again.');
            getUserInputs(); // Recalls this function to repeat the question.
            return;
        }

        readline.question('Enter the maximum employee age (18-100): ', maxAge => {
            maxAge = parseInt(maxAge);
            if (!isPositiveNumber(maxAge) || !isValidAge(maxAge) || maxAge <= minAge) {
                console.error('Maximum age must be a positive number between 18 and 100 and greater than minimum age. Please try again.');
                getUserInputs(); // Recalls this function to repeat the question.
                return;
            }

            readline.question('Enter the number of employees to generate: ', count => {
                if (!isPositiveNumber(count)) {
                    console.error('The number of employees must be a positive number. Please try again.');
                    getUserInputs(); // Recalls this function to repeat the question.
                    return;
                }

                // End readline interaction
                readline.close();

                // Creates an input object with validated data
                const dtoIn = {
                    count: parseInt(count),
                    age: {
                        min: minAge,
                        max: maxAge
                    }
                };

                // Executes the main function and processes data
                const dtoOut = main(dtoIn);

                // Outputs the results to the console
                console.log('Generated employee data:', dtoOut);
            });
        });
    });
}

// Call the function to gather user inputs
getUserInputs();