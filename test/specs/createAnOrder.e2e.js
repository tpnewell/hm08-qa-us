const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () =>  {
// 1. Setting the address
    it('Should set the address', async () => {
        await page.setURLAndAddress();
        //begin expect checks
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    })

// 2. Selecting Supportive plan tariff
    it('Should select supportive plan', async () => {
        await page.setURLAndAddress();
        const tariffSelectiion = await $(page.tariffSelectiion);
        await page.selectSupportiveTariff();
        await expect(tariffSelectiion).toBeDisplayed();
    })

// 3. Filling in the phone number
    it ('Should fill in the phone number and submit code to save', async () => {
        await page.setURLAndAddress();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

// 4. Adding a credit card
    it ('Should add a credit card and save it', async () => {
        await page.setURLAndAddress();   
        await page.openCreditCard();
        const addCreditCardModal = await $(page.addCreditCardModal);
        const creditCardField = await $(page.creditCardField);
        const creditCardCVC = await $(page.creditCardCVC);
        await expect(addCreditCardModal).toBeDisplayed();
        await page.fillCreditCard('1234 5000 4560', '50');
        await expect(creditCardField).toHaveValue('1234 5000 4560');
        await expect(creditCardCVC).toHaveValue('50');
        //avoid a stale element in run- close modal here
        const closeButton = await $(page.closeButton);
        await closeButton.click();
     })

// 5. Writing a message for the driver
    it ('Should write a message to the driver', async () => {
        await page.setURLAndAddress();
        await page.writeMessage('Message to driver');
        const messageButton = await $(page.messageButton);
        await expect(messageButton).toHaveValue('Message to driver');
    })

// 6. Ordering a Blanket and handkerchiefs
    it ('Should toggle Blankets and handkerchiefs', async () => {
        await page.setURLAndAddress();
        await page.selectSupportiveTariff();
        //Selecting blankets and handkerchiefs in window
        await page.openOrderRequirements();
        // await page.addBlanketAndHankey();
        // const blanketAndHankey = await $(page.blanketAndHankey);
        const isChecked = page.checkCheckbox();
       // check that toggle is checked
        if (isChecked) {
            console.log("The checkbox is checked");
            } else {
            console.log("The checkbox is not checked");
        }
    })

// 7. Ordering 2 Ice creams
    it ('Should order 2 ice creams', async () => {
        await page.setURLAndAddress();
        await page.selectSupportiveTariff();
        const iceCreamToggle = await $(page.iceCreamToggle);
        // add 2 icecreams
        await page.orderIceCream();
        await page.orderIceCream();
        await expect(iceCreamToggle).toHaveElementClass('disabled');
    })

// 8. The car search modal appears
    it ('Should open car search modal', async () => {
        await page.setURLAndAddress();
        await page.selectSupportiveTariff();
        //add number
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        //add payment     
        await page.openCreditCard();
        await page.fillCreditCard('1234 5000 4560', '50');
        //avoid a stale element in run- close modal here
        const closeButton = await $(page.closeButton);
        await closeButton.click();
        // write message
        await page.writeMessage('Message to driver');
        //select blankets
        await page.openOrderRequirements();
        // select ice cream
        await page.orderIceCream();
        await page.orderIceCream();
       //open car order modal
        const carOrderModal = await $(page.carOrderModal);
        await page.carSearch();
        await expect(carOrderModal).toBeDisplayed();
    })

// 9. Driver info appears
    it ('Should wait for driver info to appear', async () => {
        await page.setURLAndAddress();
        await page.selectSupportiveTariff();
        //add number
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        //add payment     
        await page.openCreditCard();
        await page.fillCreditCard('1234 5000 4560', '50');
        const closeButton = await $(page.closeButton);
        await closeButton.click();
        // write message
        await page.writeMessage('Message to driver');
        //select blankets
        await page.openOrderRequirements();
        // select ice cream
        await page.orderIceCream();
        await page.orderIceCream();
       //open car order modal
        await page.carSearch();
        //wait for driver info
        const driverInfo = await $(page.driverInfo);
        await driverInfo.waitForExist({ timeout: 5000 });
        const driverPhoto = await $(page.driverPhoto);
        await expect(driverPhoto).toBeDisplayed();
    })

})
