# Sprint 8 Project
## Project Summary
This project includes automated testing for the Urban Routes web app, which allows a user to order a taxi online. In the automation testing, I scripted my test to move through each "field" of fillable fields that are required in order to successfully place an order.
## Technologies and Techniques used
Git and Github\
WebdriverIO\
Javascript\
async/await\
Mocha\
Test automation
## Testing Summary
I broke my automated tests up to be more modular and readable. In `page.js` you will find the bulk of the functions, whereas `createAnOrder.e2e.js` compiles the functions into modular tests, which are all part of one successful order. In the future I hope to make the tests in `createAnOrder.e2e.js` more modular and reduce repeated code.
## Directions
- Clone or download repo
- Install npm if not already initialized with `npm install`
- Run tests with `npm run wdio`
