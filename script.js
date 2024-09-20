const pup = require("puppeteer");
let { id, pass } = require("./secret");
let dataFile = require("./data");

async function main() {
    const browser = await pup.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });

    const pages = await browser.pages();
    const page = pages[0];

    console.log("Navigating to Internshala...");
    await page.goto("https://internshala.com/", { waitUntil: "networkidle2" });

    console.log("Waiting for login button...");
    await page.waitForSelector(".login-cta", { visible: true });
    console.log("Login button appeared!");

    await page.click(".login-cta");

    console.log("Waiting for login modal...");
    await page.waitForSelector("#modal_email", { visible: true });
    console.log("Login modal appeared!");

    // Fill in login details
    await page.type("#modal_email", id);
    await page.type("#modal_password", pass);
    await page.click("#modal_login_submit");

    // Add a delay before waiting for navigation
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    console.log("Navigating to internships page...");
    await page.goto("https://internshala.com/internships", { waitUntil: "networkidle2" });

    // Wait for internship listings to load
    console.log("Waiting for internship listings...");
    await page.waitForSelector(".internship_meta .view_detail_button", { visible: true });

    // Get URLs of the first few internships
    let internshipLinks = await page.$$eval(".internship_meta .view_detail_button", links => 
        links.map(link => link.getAttribute("href"))
    );
    
    console.log("Found internship listings:", internshipLinks);

    // Apply to the first 3 internships
    for (let i = 0; i < Math.min(3, internshipLinks.length); i++) {
        let internshipUrl = internshipLinks[i]; // Use the link directly
        console.log(`Applying to internship: ${internshipUrl}`);
        await applyToInternship(page, internshipUrl, dataFile[0]);
    }

    await browser.close();
}

async function applyToInternship(page, internshipUrl, data) {
    // Navigate to the internship detail page
    await page.goto(internshipUrl, { waitUntil: "networkidle2" });

    // Click the "Apply Now" button
    await page.waitForSelector(".btn.btn-large", { visible: true });
    await page.click(".btn.btn-large");

    // Wait for application form to appear
    await page.waitForSelector("#application_button", { visible: true });
    await page.click("#application_button");

    // Fill in application details (e.g., Why should they hire you, etc.)
    let answers = await page.$$(".textarea.form-control");

    if (answers.length > 0) {
        console.log("Filling application form...");
        await answers[0].type(data["hiringReason"]);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        if (answers.length > 1) {
            await answers[1].type(data["availability"]);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            if (answers.length > 2) {
                await answers[2].type(data["rating"]);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            }
        }

        // Submit the application
        await page.click(".submit_button_container");
        console.log("Application submitted successfully!");
    }
}

main();
