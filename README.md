# **DataGenerator**

**DataGenerator** is a JavaScript CLI tool designed for generating sample employee datasets, progressively enhanced across three versions. Each version adds features useful for testing, data analysis, and visualization.

---

## JavaScript File Versions

- `DataGenerator_v1.0_Basic.js`
- `DataGenerator_v2.0_Statistics.js`
- `DataGenerator_v3.0_NameAnalysis.js`

---

## Requirements

- **Node.js** with ES6 syntax support
- Node.js modules `readline` and `util` (included in Node.js)

---

## Application Usage

1. **Open the Terminal** in the directory containing the `EmployeeDataGenerator.js` file.
2. Start the application by running:

    ```bash
    node EmployeeDataGenerator.js
    ```

    This initiates an interactive CLI session where you can configure parameters for data generation.

3. **Configure Parameters**:
    - **Select Output Type**

      Choose the type of output data to generate:

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

      After selecting output type, you will be prompted to define the minimum and maximum employee ages (between 18 and 100) and specify the number of employees:

      ```plaintext
      Enter the minimum age of employees (18 to 100):
      Enter the maximum age of employees (18 to 100):
      Enter the number of employees to generate:
      ```

4. **Result**

    Based on your selected options, the application will generate and display employee data in the structured `dtoOut` format.

---

## Version Descriptions

### **v1.0 - Basic Employee Data**

Generates randomized employee data, including names, birthdates, gender, and workload.

**Key Features**:

- **Employee Data Generation**: Creates records with random attributes.
- **Configurable Input**: Specify the number of employees and age range.
- **Interactive CLI**: User-friendly interface for setting data preferences.

---

### **v2.0 - Statistics Enhanced**

Adds comprehensive statistical insights on employee data.

**Key Features**:

- **Statistics**: Displays total employee count, workload distribution, and age metrics.
- **Advanced Analysis**: Includes median and average calculations, plus gender-specific workload analysis.

---

### **v3.0 - Name Frequency Analytics**

Provides detailed name frequency analysis, allowing for workforce insights.

**Key Features**:

- **Name Analysis**: Calculates common names for:
    - All employees, male and female employees, and specific workload groups.
- **Chart-Ready Data**: Outputs name frequency data in a format compatible with charting.

---

Each version of **DataGenerator** progressively builds upon the last, providing a robust tool for generating, analyzing, and visualizing sample workforce data. This makes **DataGenerator** ideal for testing, analytics, and educational purposes.


