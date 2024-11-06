# **DataGenerator**

**DataGenerator** is a JavaScript CLI tool for generating sample employee datasets, progressively enhanced across three versions. Each version introduces features useful for testing, data analysis, and visualization.

---

## JavaScript File Versions

- `DataGenerator_v1.0_Basic.js`
- `DataGenerator_v2.0_Statistics.js`
- `DataGenerator_v3.0_NameAnalysis.js`

---

## Requirements

- **Node.js** with ES6 syntax support
- Node.js modules `readline` and `util` (included with Node.js)

---

## Application Usage

1. **Open the Terminal** in the directory containing `EmployeeDataGenerator.js`.
2. Run the application with:

    ```bash
    node DataGenerator_v3.0_NameAnalysis.js
    ```

    This will start an interactive CLI session to configure data generation options.

3. **Configure Parameters**:
    - **Select Output Type**  
      
      Choose the type of output data you want to generate:

      ```plaintext
      Which part of the output would you like to display?
      1 => List of employees
      2 => Employee statistics and sorted list
      3 => Name frequency statistics
      4 => All information about employees
      Enter a number (1-4):
      ```

      Options:
      
      - **1**: List of generated employees.
      - **2**: Basic statistics with sorted employee list.
      - **3**: Name frequency statistics.
      - **4**: All information.

    - **Set Age Range and Number of Employees**

      After selecting output type, set the minimum and maximum employee age (between 18 and 100) and specify the number of employees:

      ```plaintext
      Enter the minimum age of employees (18 to 100):
      Enter the maximum age of employees (18 to 100):
      Enter the number of employees to generate:
      ```

4. **Result**

    Based on the selected options, the application will generate and display employee data in the structured `dtoOut` format.

---

## Version Descriptions

### **v1.0 - Basic Employee Data**

Generates randomized employee data, including names, birthdates, gender, and workload.

**Key Features**:

- **Employee Data Generation**: Creates records with random attributes.
- **Configurable Input**: Specify the number of employees and age range.
- **Interactive CLI**: User-friendly interface for setting data preferences.

**Sample Input (`dtoIn`)**:

```javascript
const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35
  }
};
