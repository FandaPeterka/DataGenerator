/**
 * @fileoverview File Header: Employee Data Generator
 * 
 * Description:
 * This script is designed to generate random employee data, including first names, last names,
 * birth dates, workloads, and additional statistics. It also provides an interactive CLI 
 * (Command Line Interface) for specifying user preferences.
 * 
 * Author: František Peterka
 * Created: 2023-11-07
 * Last Updated: 2023-11-08
 * 
 * Usage:
 * Run the script in a Node.js environment with ES6 support.
 * The script can be modified for integration into larger applications or for specific user-defined purposes.
 * 
 * External Dependencies:
 * - Node.js readline module for CLI interactions.
 * - Node.js util module for formatting output.
 * 
 * Note:
 * This script is intended for demonstration and educational purposes only. The generated data
 * is random and does not contain information about real individuals.
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
 * returns { gender: 'male', name: 'John', surname: 'Smith', birthdate: '1990-05-21T00:00:00.000Z', workload: 40 }
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
    values.sort((a, b) => a - b);

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

//-----------------------------------------------------------//
// Helper Functions for Generating Employee Name Statistics //
//-----------------------------------------------------------//

/**
 * Returns an object with the count of each name in the employee list.
 * @param {Object[]} empList - List of employees to analyze.
 * @returns {Object} Object with names as keys and their frequencies as values.
 */
function getMostCommonNames(empList) {
    // Creates an object with names as keys and counts as values.
    const nameCount = empList.reduce((count, emp) => {
        count[emp.name] = (count[emp.name] || 0) + 1;
        return count;
    }, {});
    
    // Converts the object to an array, sorts names by frequency, and returns as an object.
    return Object.entries(nameCount)
        .sort((a, b) => b[1] - a[1]) // Sorts names in descending order of frequency.
        .reduce((sorted, [name, count]) => {
            sorted[name] = count;
            return sorted;
        }, {});
}

/**
 * Filters the employee list by gender and returns the most common names.
 * @param {Object[]} employees - Array of employee objects.
 * @param {string} gender - Gender for filtering ('male' or 'female').
 * @returns {Object} Object with the most common names for the specified gender.
 */
function getNamesByGender(employees, gender) {
    // Filters employees by gender and returns the most common names.
    return getMostCommonNames(employees.filter(emp => emp.gender === gender));
}

/**
 * Filters the list of female employees with part-time workloads and returns the most common names.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {Object} Object with the most common names among female part-time employees.
 */
function getFemalePartTimeNames(employees) {
    // Filters females with part-time workloads (10, 20, 30 hours) and returns their most common names.
    return getMostCommonNames(
        employees.filter(emp => emp.gender === 'female' && [10, 20, 30].includes(emp.workload))
    );
}

/**
 * Filters the list of male employees with full-time workloads and returns the most common names.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {Object} Object with the most common names among male full-time employees.
 */
function getMaleFullTimeNames(employees) {
    // Filters males with full-time workloads (40 hours) and returns their most common names.
    return getMostCommonNames(
        employees.filter(emp => emp.gender === 'male' && emp.workload === 40)
    );
}

/**
 * Converts a name statistics object into a format suitable for chart display.
 * @param {Object} namesObject - Object containing names and their frequencies.
 * @returns {Object[]} Array of objects for each name, suitable for charting.
 */
function namesToChartData(namesObject) {
    // Converts the name statistics object to an array of objects with 'label' and 'value' properties.
    return Object.entries(namesObject).map(([label, value]) => ({ label, value }));
}

//------------------------------------------------------------//
// Main Function for Generating Employee Name Statistics //
//------------------------------------------------------------//

/**
 * Generates name statistics for employees and prepares data for charts.
 * @param {Object[]} employees - Array of employee objects.
 * @returns {Object} Object containing name statistics and chart data.
 */
function getEmployeeChartContent(employees) {
    // Retrieves name statistics for various categories of employees.
    const namesStatistics = {
        all: getMostCommonNames(employees), // Most common names among all employees.
        female: getNamesByGender(employees, 'female'), // Most common female names.
        male: getNamesByGender(employees, 'male'), // Most common male names.
        femalePartTime: getFemalePartTimeNames(employees), // Most common names among part-time females.
        maleFullTime: getMaleFullTimeNames(employees) // Most common names among full-time males.
    };

    // Converts name statistics into structures suitable for chart visualization.
    const chartData = {
        all: namesToChartData(namesStatistics.all), // Data for chart of all names.
        male: namesToChartData(namesStatistics.male), // Data for chart of male names.
        female: namesToChartData(namesStatistics.female), // Data for chart of female names.
        femalePartTime: namesToChartData(namesStatistics.femalePartTime), // Data for chart of part-time female names.
        maleFullTime: namesToChartData(namesStatistics.maleFullTime) // Data for chart of full-time male names.
    };

    // Returns an object containing both raw name statistics and prepared chart data.
    return {
        names: namesStatistics,
        chartData: chartData
    };
}

//------------------- Main Generation and Output Function -------------------//

/**
 * Main function for generating employee data and statistics.
 * @param {Object} dtoIn - Input object with parameters for data generation.
 * @param {string} returnPart - Specifies which part of the data to return.
 * @returns {Object|Object[]|string} Depending on returnPart, either an array of employees,
 *                                  an object with other statistics, an object with name statistics,
 *                                  or a combination of both, or an error message.
 */
function main(dtoIn, returnPart) {
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

    // Get name statistics for use in charts.
    const namesStatistics = getEmployeeChartContent(employees);

    // Get general statistics about employees.
    const otherStatistics = getEmployeeStatistics(employees);

    // Combine results into a single object for output.
    const dtoOut = [namesStatistics, otherStatistics];

    // Determine output based on the request.
    switch(returnPart) {
        case '1':
            return employees; // Returns the array of employees.
        case '2':
            return dtoOut[1]; // Returns general employee statistics.
        case '3':
            return dtoOut[0]; // Returns employee name statistics.
        case '4':
            return dtoOut; // Returns the complete set of output data.
        default:
            return 'Unknown part'; // Returns an error if an invalid request is made.
    }
}

//---------------------------------------------------//
// Interactive Section for Gathering User Inputs //
//---------------------------------------------------//

// Import required modules for interactive input/output.
const readline = require('readline');
const util = require('util'); // Module for better output formatting.

// Create readline interface for user interaction via console.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Asks the user which part of the output they want to display and processes the answer.
 */
function selectOutputPart() {
    const questionText = [
        'Which part of the output would you like to display?',
        '1 => Employee list',
        '2 => General employee statistics and sorted list',
        '3 => Employee name statistics',
        '4 => All employee information',
        'Enter a number (1-4):'
    ].join('\n');

    rl.question(questionText, part => {
        part = part.trim(); // Removes whitespace from input.
        if (['1', '2', '3', '4'].includes(part)) {
            askForMinimumAge(part); // Redirects user to the next step.
        } else {
            console.log('Invalid selection.');
            selectOutputPart(); // Asks the question again if input is invalid.
        }
    });
}

// Initiates the first user interaction function.
selectOutputPart();

/**
 * Asks the user for the minimum employee age and processes the answer.
 * @param {string} returnPart - The part of the output the user wants to display.
 */
function askForMinimumAge(returnPart) {
    rl.question('Enter minimum employee age (18 to 100): ', minAge => {
        const minAgeNum = parseInt(minAge);
        if (isNaN(minAgeNum) || minAgeNum < 18 || minAgeNum > 100) {
            console.error('Invalid age. Enter a number between 18 and 100.');
            askForMinimumAge(returnPart); // Repeats question if input is invalid.
        } else {
            askForMaximumAge(minAgeNum, returnPart); // Proceeds to maximum age.
        }
    });
}

/**
 * Asks the user for the maximum employee age and processes the answer.
 * @param {number} minAgeNum - Minimum employee age.
 * @param {string} returnPart - The part of the output the user wants to display.
 */
function askForMaximumAge(minAgeNum, returnPart) {
    rl.question('Enter maximum employee age (18 to 100): ', maxAge => {
        const maxAgeNum = parseInt(maxAge);
        if (isNaN(maxAgeNum) || maxAgeNum < minAgeNum || maxAgeNum > 100) {
            console.error('Invalid age. Enter a number greater than minimum age and up to 100.');
            askForMaximumAge(minAgeNum, returnPart); // Repeats question if input is invalid.
        } else {
            askForEmployeeCount(minAgeNum, maxAgeNum, returnPart); // Asks for employee count.
        }
    });
}

/**
 * Asks the user for the number of employees to generate and processes the answer.
 * @param {number} minAgeNum - Minimum employee age.
 * @param {number} maxAgeNum - Maximum employee age.
 * @param {string} returnPart - The part of the output the user wants to display.
 */
function askForEmployeeCount(minAgeNum, maxAgeNum, returnPart) {
    rl.question('Enter the number of employees to generate: ', count => {
        const countNum = parseInt(count);
        if (isNaN(countNum) || countNum <= 0) {
            console.error('Invalid count. Enter a positive number.');
            askForEmployeeCount(minAgeNum, maxAgeNum, returnPart); // Repeats question if input is invalid.
        } else {
            rl.close(); // Ends the readline interaction.
            generateAndDisplayEmployeeData(minAgeNum, maxAgeNum, countNum, returnPart); // Generates data.
        }
    });
}

/**
 * Generates employee data based on specified parameters and displays results.
 * @param {number} minAge - Minimum employee age.
 * @param {number} maxAge - Maximum employee age.
 * @param {number} count - Number of employees to generate.
 * @param {string} returnPart - The part of the output the user wants to display.
 */
function generateAndDisplayEmployeeData(minAge, maxAge, count, returnPart) {
    const dtoIn = { count, age: { min: minAge, max: maxAge } };
    const dtoOut = main(dtoIn, returnPart); // Calls main function and gets output.
    console.log('dtoOut =', util.inspect(dtoOut, { showHidden: false, depth: null, colors: true })); // Formats and displays output.
}