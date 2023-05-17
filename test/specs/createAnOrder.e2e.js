const page = require('../../page');
const helper = require('../../helper')

// describe('Create an order', () => {
//     it('should open phone number modal', async () => {
//         await browser.url(`/`)
//         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

//         const phoneNumberButton = await $(page.phoneNumberButton);
//         await phoneNumberButton.waitForDisplayed();
//         await phoneNumberButton.click();
//         const pnoneNumberModal = await $(page.phoneNumberModal);
//         await expect(pnoneNumberModal).toBeExisting();
//     })

//     it('should save the phone', async () => {
//         await browser.url(`/`)
//         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
//         const phoneNumber = helper.getPhoneNumber("+1");
//         await page.submitPhoneNumber(phoneNumber);
//         await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
//     })
// })


describe('Create an order', () =>  {
// 1. Setting the address
    it('Should set the address', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    })

// 2. Selecting Supportive plan tariff
    it('Should select supportive plan', async () => {
        const tariffSelectiion = await $(page.tariffSelectiion);
        await tariffSelectiion.waitForDisplayed();
        await tariffSelectiion.click();
    })

// 3. Filling in the phone number
    it ('Should fill in the phone number and submit code to save', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

// 4. Adding a credit card
    it ('Should add a credit card and save it', async () => {
       await page.openCreditCard();
       await page.fillCreditCard('1234 5000 4560', '50');
     })

// 5. Writing a message for the driver
    it ('Should write a message to the driver', async () => {
        await page.writeMessage('Message to driver');
    })

// 6. Ordering a Blanket and handkerchiefs
    it ('Should toggle Blankets and handkerchiefs', async () => {
        await page.toggleOptions();
    
    })

// 7. Ordering 2 Ice creams
    it ('Should order 2 ice creams', async () => {
        await page.orderIceCream();
    })

// 8. The car search modal appears
    it ('Should open car search modal', async () => {
        const carOrderModal = await $(page.carOrderModal);
        await page.carSearch();
        await expect(carOrderModal).toBeExisting();
    })

// 9. Waiting for the driver info to appear in the modal (optional-- attempt after first submission)

})
