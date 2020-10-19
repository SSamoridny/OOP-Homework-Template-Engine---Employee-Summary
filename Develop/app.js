const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//This is our empty user array
let userList = []
let userId = 1

//Creation of an asynchronus function to wrap our code in
async function main(){
    //Manager Info
    const managerInfo = await inquirer.prompt([
        {
            name: "name",
            message: "What is the manager's Name?"
        },
        {
            name: "email",
            message: "What is the manager's Email?"
        },
        {
            name: "office",
            message: "What is the manager's OfficeNumber?"
        },
        {
            name: "teamMembers",
            message: "How many members in your team?"
        }]
    )

    const manager = new Manager( managerInfo.name, userId++, managerInfo.email, managerInfo.office )
    userList.push( manager )

    // loop through and get user name/title for each person
    for( var i=0; i<managerInfo.teamMembers; i++ ){
        // ... YOUR CODE HERE PROMPT FOR THE EMPLOYEES ...
        const employeeInfo = await inquirer.prompt ([
            {
                name: "name",
                message: "What is the employee's name?"
            },
            {
                email: "email",
                message: "What is the employee's e-mail?" 
            },
            {
                name: "role",
                type: "checkbox",
                message: "What is this employee's role?",
                choices: [
                    "Software Engineer",
                    "Intern",
                ]
            }]
        )

        //If Else statement to decide info between Engineer and Intern
        const softwareEngineer = new Engineer( engineerInfo.name, userId++, engineerInfo.email, engineerInfo.github )
        userList.push( softwareEngineer )

        const newIntern = new Intern( internInfo.name, userId++, internInfo.email, internInfo.school )
        userList.push( newIntern )
        
        //Engieer required info
        if( employeeInfo.role === "Software Engineer"){
            const engineerInfo = await inquirer.prompt([{
                name: "github",
                message: "What is the engineer's GitHub name?",
            }])
        } else {
            //Intern required info
            const internInfo = await inquirer.prompt([{
                name: "school",
                message: "What school is the intern from?",
            }])
        }
        //This pushed the info to our empty array
        userList.push( employee )
    }

    // Create the output directory if the output path doesn't exist
    if( !fs.existsSync(OUTPUT_DIR) ) fs.mkdirSync(OUTPUT_DIR)
    // use the pre-built render function to build the list...
    fs.writeFileSync(outputPath, render(userList), "utf-8");

    console.log( `Completed writing to: ${outputPath}` )

}
//Calling main() at the end of the code 
main()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
