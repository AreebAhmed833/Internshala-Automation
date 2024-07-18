# Internshala Automation with Puppeteer

This project automates the process of logging into Internshala, updating profile details, and applying for internships using Puppeteer, a Node.js library for controlling headless Chrome or Chromium browsers.

## Features

- Automatically log into Internshala
- Update profile details (graduation, training, work samples)
- Apply for internships

## Prerequisites

- Node.js installed on your machine
- Basic knowledge of JavaScript

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/internshala-automation.git
    cd internshala-automation
    ```

2. Install the required dependencies:
    ```bash
    npm install puppeteer
    ```

3. Create a `secret.js` file with your Internshala login credentials:
    ```javascript
    module.exports = {
      id: "your-email@example.com",
      pass: "yourpassword"
    };
    ```

4. Create a `data.js` file with your profile details:
    ```javascript
    module.exports = [
      {
        College: "XYZ University",
        Degree: "Bachelor of Technology",
        Stream: "Computer Science",
        Percentage: "85%",
        Training: "Machine Learning",
        Organization: "ABC Corp",
        description: "Completed a training on Machine Learning",
        link: "http://example.com/portfolio",
        hiringReason: "I am passionate about learning and contributing to real-world projects.",
        availability: "I am available full-time from June to August.",
        rating: "I have a strong foundation in programming and problem-solving."
      }
    ];
    ```

## Usage

Run the script using Node.js:
```bash
node index.js
```

## Code Explanation

### Main Components

1. **Dependencies**:
   - `puppeteer`: A Node.js library for controlling headless Chrome or Chromium browsers.

2. **External Files**:
   - `secret.js`: Contains user credentials (id and password).
   - `data.js`: Contains user profile data (e.g., college, degree, training details).

### Functions

1. **main()**: The main function that initiates the browser, logs into Internshala, updates profile information, and applies for internships.

2. **graduation(data)**: Updates the user's graduation details on the profile.

3. **training(data)**: Updates the user's training details on the profile.

4. **workSample(data)**: Updates the user's work samples on the profile.

5. **application(data)**: Navigates to the internship application section and applies for internships based on provided data.

6. **apply(url, data)**: Fills out and submits internship applications.

### Example Data Structure

**`secret.js`**:
```javascript
module.exports = {
  id: "your-email@example.com",
  pass: "yourpassword"
};
```

**`data.js`**:
```javascript
module.exports = [
  {
    College: "XYZ University",
    Degree: "Bachelor of Technology",
    Stream: "Computer Science",
    Percentage: "85%",
    Training: "Machine Learning",
    Organization: "ABC Corp",
    description: "Completed a training on Machine Learning",
    link: "http://example.com/portfolio",
    hiringReason: "I am passionate about learning and contributing to real-world projects.",
    availability: "I am available full-time from June to August.",
    rating: "I have a strong foundation in programming and problem-solving."
  }
];
```

## License

This project is licensed under the MIT License.

---

Feel free to customize this README file to match the specifics of your project and repository.
