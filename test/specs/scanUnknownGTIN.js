
const LoginPage = require('../pageobjects/login.page');
const digits = require('../pageobjects/digit.cal.js');
const data = require('../utility/expectationFile')
const matrix = require('../utility/2dMatrixPage')
const utilityFunction = require('../utility/reusableFunctions')
const wait = require('../utility/timeout')
const allureReporter = require('@wdio/allure-reporter').default



describe('105_Scan the code which contains unknown gtin', () => {


    if (!process.env.npm_config_browserOnly) {


        after(async () => {
            console.log("Starting Mobile Execution");
            await utilityFunction.runAppium("")
        })
        console.log("Running test suite in incremental mode and browser tests only")
    } else {

        console.log("different flag")

    }

    it('Browser - should Scan the code which contains unknown gtin', async () => {
        allureReporter.addDescription('Scan the code which contains unknown gtin')
        allureReporter.addStep("Scan the code which contains unknown gtin")
        allureReporter.addTestId('gtin_1')

        await LoginPage.opensuburl();
        await wait.setTimeoutwait(2);
        await browser.maximizeWindow();
        await wait.setTimeoutwait(2);
        await digits.clickCookie();
        await wait.setTimeoutwait(4);
        const random = Math.floor(1000000000000 + Math.random() * 9000000000000)
        await digits.enterDigits(random);
        await wait.setTimeoutwait(2);
        await digits.clickCalculate();
        await wait.setTimeoutwait(2);
        GTIN = await digits.copyGtin()
        await wait.setTimeoutwait(2);
        //generate expectation file
        data.generateExpectationFile(GTIN, utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber(), utilityFunction.getBrandName(), "", "", "", "", "")
        await wait.setTimeoutwait(12);

        //generate 2d matrix Image
        matrix.generate2dMatrixImage(GTIN, utilityFunction.getbatchId(), utilityFunction.getCurrentRandomDate(), utilityFunction.getSerialNumber())
        await wait.setTimeoutwait(12);

        allureReporter.addAttachment('img', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/jpeg');

    })
})
