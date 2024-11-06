/**
 * File Header: Employee Data Generator
 * 
 * Description:
 * This script is designed to generate random employee data, including names, surnames,
 * birth dates, workloads, and then calculate statistics from this data. It also provides
 * an interactive CLI (Command Line Interface) for user interaction (data input selection).
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
 * returns { gender: 'male', name: 'John', surname: 'Doe', birthdate: '1990-05-21T00:00:00.000Z', workload: 40 }
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

 //-------------------------------------------------------------//
// Helper Functions for General Employee Statistics Generation //
//-------------------------------------------------------------//

/**
 * Helper function to calculate the median of an array of values.
 * @param {number[]} values - Array of numeric values.
 * @returns {number} Median of the provided values.
 */
function median(values) {
    // Throws an error if the array contains no values.
    if(values.length === 0) throw new Error("No inputs");

    // Sorts values and finds the middle value.
    values.sort((a,b) => a - b);

    const half = Math.floor(values.length / 2);

    // Returns the middle value if the count is odd; otherwise, the average of the two middle values.
    return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2.0;
}

/**
 * Calculates the total number of employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {number} Total number of employees.
 */
function getTotalNumberOfEmployees(employees) {
    // Returns the length of the array, which corresponds to the number of employees.
    return employees.length;
}

/**
 * Calculates the age based on a birthdate.
 * @param {string} birthdate - Birthdate in ISO 8601 format.
 * @returns {number} Current age of the person.
 */
function getCurrentAge(birthdate) {
    // Converts the string to a Date object.
    const birthDate = new Date(birthdate);
    // Gets the current date.
    const today = new Date();
    // Calculates the difference in years.
    let age = today.getFullYear() - birthDate.getFullYear();
    // Adjusts age if the current month/day is before the birthday.
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    // Returns the resulting age.
    return age;
}

/**
 * Counts employees by their workload.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {Object} An object with the count of employees for each workload level.
 */
function getEmployeesByWorkload(employees) {
    // Initializes an object to count workloads.
    const workloadCounts = { 10: 0, 20: 0, 30: 0, 40: 0 };
    // Iterates over employees and increments the counter for the respective workload.
    employees.forEach(employee => {
        workloadCounts[employee.workload]++;
    });
    // Returns the object with employee counts for each workload.
    return workloadCounts;
}

/**
 * Calculates the average age from an array of ages.
 * @param {number[]} ages - Array of employee ages.
 * @returns {number} Average age of employees.
 */
function getAverageAgeFromAgesArray(ages) {
    // Sums all ages and divides by the count to get the average.
    const sumOfAges = ages.reduce((sum, age) => sum + age, 0);
    // Returns the average age rounded to one decimal place.
    return parseFloat((sumOfAges / ages.length).toFixed(1));
}

/**
 * Finds the minimum age among employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {number} Minimum employee age.
 */
function getMinAge(employees) {
    // Uses spread operator to pass ages to Math.min.
    return Math.min(...employees.map(employee => getCurrentAge(employee.birthdate)));
}

/**
 * Finds the maximum age among employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {number} Maximum employee age.
 */
function getMaxAge(employees) {
    // Uses spread operator to pass ages to Math.max.
    return Math.max(...employees.map(employee => getCurrentAge(employee.birthdate)));
}

/**
 * Calculates the median age of employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {number} Median employee age.
 */
function getMedianAge(employees) {
    // Converts birthdates to ages and sorts them.
    const ages = employees.map(employee => getCurrentAge(employee.birthdate)).sort((a, b) => a - b);
    // Returns the median age.
    return median(ages);
}

/**
 * Calculates the median workload of employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {number} Median employee workload.
 */
function getMedianWorkload(employees) {
    // Converts workloads to an array and sorts them.
    const workloads = employees.map(employee => employee.workload).sort((a, b) => a - b);
    // Returns the median workload.
    return median(workloads);
}

/**
 * Calculates the average workload among female employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {number} Average workload among female employees.
 */
function getAverageWorkloadOfFemales(employees) {
    // Filters female employees and creates an array of their workloads.
    const femaleWorkloads = employees.filter(employee => employee.gender === 'female').map(employee => employee.workload);
    // Sums workloads and calculates the average.
    const sumOfWorkloads = femaleWorkloads.reduce((sum, workload) => sum + workload, 0);
    // Returns the average if there are females, otherwise 0.
    return femaleWorkloads.length > 0 ? parseFloat((sumOfWorkloads / femaleWorkloads.length).toFixed(1)) : 0;
}

/**
 * Sorts employees by their workload.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {Object[]} Array of employees sorted by workload.
 */
function getEmployeesSortedByWorkload(employees) {
    // Returns an array of employees sorted by their workload.
    return employees.sort((a, b) => a.workload - b.workload);
}

//---------------------------------------------------------------//
// Main Function for Generating Employee Statistics //
//---------------------------------------------------------------//

/**
 * Generates a set of statistics for an array of employees.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {Object} Object containing statistical data about employees.
 */
function getEmployeeStatistics(employees) {
    // Calculates the total number of employees.
    const totalEmployees = getTotalNumberOfEmployees(employees);
    
    // Converts employee birthdates to ages and creates an array of them.
    const agesArray = employees.map(employee => getCurrentAge(employee.birthdate));
    
    // Calculates the average employee age.
    const averageAge = getAverageAgeFromAgesArray(agesArray);
    
    // Finds the minimum employee age.
    const minAge = getMinAge(employees);
    
    // Finds the maximum employee age.
    const maxAge = getMaxAge(employees);
    
    // Calculates the median employee age.
    const medianAge = getMedianAge(employees);
    
    // Calculates the median workload among employees.
    const medianWorkload = getMedianWorkload(employees);
    
    // Calculates the average workload among female employees.
    const averageWomenWorkload = getAverageWorkloadOfFemales(employees);
    
    // Retrieves counts of employees by workload.
    const workloadCounts = getEmployeesByWorkload(employees);
    
    // Sorts employees by their workload.
    const sortedByWorkload = getEmployeesSortedByWorkload(employees);
    
    // Creates an object containing all calculated statistics.
    const statistics = {
        total: totalEmployees,
        workload10: workloadCounts[10],
        workload20: workloadCounts[20],
        workload30: workloadCounts[30],
        workload40: workloadCounts[40],
        averageAge: averageAge,
        minAge: minAge,
        maxAge: maxAge,
        medianAge: medianAge,
        medianWorkload: medianWorkload,
        averageWomenWorkload: averageWomenWorkload,
        // Maps the employee array to include relevant information and be sorted by workload.
        sortedByWorkload: sortedByWorkload.map(employee => ({
            gender: employee.gender,
            birthdate: employee.birthdate,
            name: employee.name,
            surname: employee.surname,
            workload: employee.workload
        }))
    };
    // Returns the object containing all calculated statistics.
    return statistics;
}

//--------------Main Function Containing Lists and Combining Code for a Single Output-----------------//

/**
 * Main function for generating employee data and their statistics.
 * @param {Object} dtoIn - Input object with parameters for data generation.
 */
function main(dtoIn) {
    // Define specific lists of first and last names for males and females.
    const maleNames = ["John", "James", "Robert", "Michael", "David", "William", "Richard", "Joseph", "Charles", "Thomas"];
    const femaleNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"];
    
    const maleSurnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    const femaleSurnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    
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

    // Get general statistics about employees.
    const otherStatistics = getEmployeeStatistics(employees);

    // Combined results as output.
    const dtoOut = otherStatistics;
    
    // Output (main function output) 
    return dtoOut; 

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
                console.log('Generated employee statistics:', dtoOut);
            });
        });
    });
}

// Call the function to gather user inputs
getUserInputs();