module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardField: '#number.card-input',
    creditCardCVC: '#code.card-input',
    // Buttons
    //Address and phone number modals
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    // Buttons related to payment modal
    confirmButton: 'button=Confirm',
    linkButton: 'button=Link',
    closeButton: '(//button[@class="close-button section-close"])[3]',
    creditCardButton: '.pp-text',
    addCreditCardButton: '//div[starts-with(text(), "Add card")]',
    // Add message to driver
    messageButton: '//*[@id="comment"]',
    //Main order button
    orderButton: '.smart-button',
    // Supportive button
    tariffSelectiion: '//div[starts-with(text(), "Supportive")]',
    orderReqToggle: '//div[@class="reqs open"]',
    iceCreamToggle: '.counter-plus',
    blanketAndHankey: '(//div[@class="r-sw-container"])[1]',
    // Modals
    phoneNumberModal: '.modal',
    addCreditCardModal: '.card-wrapper',
    carOrderModal: ".order-body",
    driverInfo: ".order-subbody",
    driverPhoto: "(//img[@alt='close'])[1]",
   
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
  
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },

    openCreditCard: async function() {
        // waiting for payment button to appear and click on page
        const creditCardButton = await $(this.creditCardButton);
        await creditCardButton.waitForDisplayed();
        await creditCardButton.click();
       //waiting for add a card button to appear and be clicked
        const addCreditCardButton = await $(this.addCreditCardButton);
        await addCreditCardButton.waitForDisplayed();
        await addCreditCardButton.click();
        //confirmation that modal pops up
        const addCreditCardModal = await $(this.addCreditCardModal);
        await addCreditCardModal.waitForDisplayed();
    },

    fillCreditCard: async function(creditCard, cvc) {
    //select and set value of credit card fields
        const creditCardField = await $(this.creditCardField);
        await creditCardField.waitForDisplayed();
        await creditCardField.setValue(creditCard);
    //select and set value of cvc field
        const creditCardCVC = await $(this.creditCardCVC);
        await creditCardCVC.waitForDisplayed();
        await creditCardCVC.setValue(cvc);
    //save and close payment modal
    //click away to trigger link click availability
        await creditCardField.click();
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
    },
    
    writeMessage: async function(message) {
        const messageButton = await $(this.messageButton);
        await messageButton.waitForDisplayed();
        await messageButton.setValue(message);
    },

    openOrderRequirements: async function() {
        const orderReqToggle = await $(this.orderReqToggle);
        await orderReqToggle.waitForDisplayed();
    },

    // addBlanketAndHankey: async function() {
    //     const blanketAndHankey = await $(this.blanketAndHankey);
    //     await blanketAndHankey.waitForDisplayed();
    //     await blanketAndHankey.click();
    // }, 

    checkCheckbox: async function () {
        const blanketAndHankey = await $(this.blanketAndHankey);
        return blanketAndHankey.checked;
    },

    orderIceCream: async function() {
        const iceCreamToggle = await $(this.iceCreamToggle);
        await iceCreamToggle.click();
    },

    carSearch: async function() {
        const orderButton = await $(this.orderButton);
        await orderButton.click();
        const carOrderModal = await $(this.carOrderModal);
        await carOrderModal.waitForDisplayed();
    }, 

    //multiple uses
    setURLAndAddress: async function() {
        await browser.url('/');
        await this.fillAddresses('East 2nd Street, 601', '1300 1st St');
    },

    selectSupportiveTariff: async function(tariff) {
        const tariffSelectiion = await $(this.tariffSelectiion);
        await tariffSelectiion.click();
    },

};