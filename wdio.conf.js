const path = require('path')
const fs = require('fs')

// Store the directory path in a global, which allows us to access this path inside our tests
global.downloadDir = path.join(__dirname, './test/Json_File');

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================

    // user: process.env.USERNAME,
    // key: process.env.ACCESS_KEY,
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
    // then the current working directory is where your `package.json` resides, so `wdio`
    // will be called from there.
    //
    specs: [

        [



            // 'test/specs/demiurgeAddAdmin.js',
            // 'test/specs/demiurgeAddEnterpriseWalletUser.js',

            // 'test/specs/invalidLoginCredentials.js',

            // 'test/specs/gtinPage.js',
            'test/specs/loginCredentials.js',

            // 'test/specs/createProduct.js',
            // 'test/specs/createBatch.js',

            // 'test/specs/editBatchforRecallMsg.js',
            // 'test/specs/editProductforToggle_ePIFlag.js',

            // 'test/specs/enableSerialNumberCheckWithValidMatrix.js',
            // 'test/specs/enableSerialNumberCheckWithInvalidMatrix.js',
            // 'test/specs/disableSerialNumberCheckWithSerialNumber.js',
            // 'test/specs/disableSerialNumberCheckWithOutSerialNumber.js',
            // 'test/specs/disableSerialNumberCheckWithInvalidMatrix.js',


            // 'test/specs/enableIncorrectExpiryDateCheckWithValidMatrix.js',
            //'test/specs/enableIncorrectExpiryDateCheckWithInvalidMatrix.js',
            //'test/specs/disableIncorrectExpiryDateCheckWithInvalidDate.js',
            // 'test/specs/enableExpiredExpiryDateCheckWithValidMatrix.js',
            // 'test/specs/enableExpiredExpiryDateCheckWithInvalidMatrix.js',
            // 'test/specs/disableExpiredExpiryDateCheckWithInvalidMatrix.js',


            // 'test/specs/batchRecallForSerializedWithSN.js',
            // 'test/specs/batchRecallForSerializedUndoRecallFlag.js',
            // 'test/specs/batchRecallForNonSerializedWithoutSN.js',
            // 'test/specs/batchRecallForNonSerializedUndoRecallFlag.js',

            // 'test/specs/createBatchWithNoBatchMsg.js',
            // 'test/specs/createBatchWithBatchMsg.js',
            // 'test/specs/createBatchWithBatchRecallAndMsg.js',
            // 'test/specs/createBatchWithBatchMsgAndRecallMsg.js',

            // 'test/specs/createBatchWithValidSnExpiryDateRecallMsg.js',
            // 'test/specs/scanExpiredDateInBatch.js',
            // 'test/specs/scanExpiredDateAndInvalidSerialNumberInBatch.js',

            // 'test/specs/createBatchWithXExpiryDate.js',
            // 'test/specs/changeDayOnDateBatchMatrixY.js',
            // 'test/specs/changeMonthOnDateBatchMatrixY.js',
            // 'test/specs/changeYearOnDateBatchMatrixY.js',

            // 'test/specs/createBatchWithMonthYearExpiryDate.js',
            // 'test/specs/disableDaySelectionIncorrectAndExpiredDateFlag.js',
            // 'test/specs/disableDaySelectionIncorrectAndEnableExpiredDateFlag.js',
            // 'test/specs/disableDaySelectionExpiredDateAndEnableIncorrectFlag.js',
            // 'test/specs/enableDaySelectionAndDisableIncorrectExpiredDateFlag.js',
            // 'test/specs/enableDaySelectionIncorrectAndDisableExpiredDateFlag.js',
            // 'test/specs/enableDaySelectionExpiredDateAndDisableIncorrectFlag.js',

            // 'test/specs/validSerialNumber.js',
            // 'test/specs/clearValidSerialNumber.js',
            // 'test/specs/clearInvalidSerialNumber.js',
            // 'test/specs/recalledSerialNumbers.js',
            // 'test/specs/clearRecalledSerialNumbers.js',
            // 'test/specs/decommissionedSerialNumber.js',
            // 'test/specs/createBatchWithValidSNRecalledSNDecommissionedSN.js',
            // 'test/specs/scanWithRecalledSerialNumber.js',
            // 'test/specs/scanWithDecommissionedSerialNumber.js',
            // 'test/specs/remove10SnInValidUpload10InRecalledSerialNumber.js',
            // 'test/specs/remove10SnInValidUpload10InDecommissionedSerialNumber.js',

            // 'test/specs/updateBatchWithoutSerialNumber.js',
            // 'test/specs/updateBatchWithSerialNumber.js',
            // 'test/specs/updateBatchToResetSerialNumber.js',
            // 'test/specs/updateBatchWithDecommissionedAndRecalledSerialNumber.js',
            // 'test/specs/updateBatchWithNoDecommissionedAndRecalledSerialNumber.js',

            // 'test/specs/createBatchWithoutanyFile.js',
            // 'test/specs/uploadNewVersionOfEpiInProduct.js',
            // 'test/specs/createBatchWithUploadLeaflet.js',
            // 'test/specs/versionOfEpiNotReplaced.js',
            //'test/specs/createProductWithUploadLeafletAndSMPC.js',
            //'test/specs/updateProductWithNewSMPC.js',
            // 'test/specs/createBatchWithUploadLeafletAndSMPC.js',
            // 'test/specs/deleteLeafletAndSMPCInBatch.js',
            // 'test/specs/scanPreviousBatch.js',

            // 'test/specs/checkBatchRecallInProductAndNotRecalledInBatch.js',
            // 'test/specs/checkBatchIsRecalledInProductAndBatch.js',
            // 'test/specs/checkSmpcDeletedFromProductWithRecalledBatch.js',
            // 'test/specs/uncheckBatchRecallInProductAndRecalledInBatch.js',
            // 'test/specs/uncheckBatchRecallInProductAndBatch.js',
            // 'test/specs/uncheckSmpcDeletedFromProductWithRecalledBatch.js',

            // 'test/specs/checkExpirationDateInProductAndBatchWithCorrectExpiryDate.js',
            // 'test/specs/checkInCorrectExpiryDateInProductAndBatch.js',
            // 'test/specs/checkSmpcDeletedFromProductWithIncorrectExpiryDate.js',
            // 'test/specs/uncheckInCorrectExpiryDateInProductAndBatch.js',
            // 'test/specs/uncheckExpirationDateInProductAndBatchWithCorrectExpiryDate.js',

            // 'test/specs/checkBatchIsExpiredInProductAndBatch.js',
            // 'test/specs/checkBatchIsExpiredInProductAndNotExpiredInBatch.js',
            // 'test/specs/checkSmpcDeletedFromProductWithExpiredBatch.js',
            // 'test/specs/uncheckBatchIsExpiredInProductAndExpiredInBatch.js',
            // 'test/specs/uncheckBatchIsExpiredInProductAndNotExpiredInBatch.js',

            // 'test/specs/checkSnRecallInProductAndBatch.js',
            // 'test/specs/checkSnRecallInProductAndNotRecalledInBatch.js',
            // 'test/specs/checkSmpcIsDeletedFromProductWithSnRecalled.js',
            // 'test/specs/uncheckSnRecallInProductAndUpdateSnInBatch.js',
            // 'test/specs/uncheckSnRecallInProductAndNotRecalledInBatch.js',

            // 'test/specs/checkSnDecommissionedInProductAndBatch.js',
            // 'test/specs/checkSnDecommissionedInProductAndNotInBatch.js',
            // 'test/specs/checkSmpcIsDeletedFromProductWithSnDecommissioned.js',
            // 'test/specs/uncheckSnDecommissionedInProductAndDecommissionedInBatch.js',
            // 'test/specs/uncheckSnDecommissionedInProductAndNotDecommissionedInBatch.js',

            // 'test/specs/checkSnIsUnknownInProductAndBatch.js',
            // 'test/specs/checkSnIsUnknownInProductAndknownInBatch.js',
            // 'test/specs/checkSmpcIsDeletedFromProductWithSnIsUnknown.js',
            // 'test/specs/uncheckSnIsUnknownInProductAndBatch.js',
            // 'test/specs/uncheckSnIsUnknownInProductAndknownInBatch.js',

            // 'test/specs/checkBatchIsUnknownInProductWithInvalidBatch.js',
            // 'test/specs/checkBatchIsUnknownInProductWithValidBatch.js',
            // 'test/specs/checkSmpcIsDeletedFromProductWithBatchIsUnknown.js',
            // 'test/specs/uncheckBatchIsUnknownInProductWithInvalidBatch.js',
            // 'test/specs/uncheckBatchIsUnknownInProductWithValidBatch.js',

            // 'test/specs/invalidSerialNumberAndInvalidExpiryDate.js',
            // 'test/specs/checkUnknowBatchWithInvalidBatchAndInvalidExpiryDate.js',
            // 'test/specs/uncheckUnknowBatchWithInvalidBatchAndInvalidExpiryDate.js',
            // 'test/specs/invalidSerialNumberWithBatchRecalled.js',

            //'test/specs/scanUnknownGTINWithValidBatchSNAndExpiryDate.js',
            //'test/specs/disableBatchIsUnknownFlagWithOnlyValidGTINMatrix.js',
            //'test/specs/enableBatchIsUnknownFlagWithOnlyValidGTINMatrix.js'

            // 'test/specs/productImport.js',
            'test/specs/removeInventedNameInProductJson.js',
            // 'test/specs/removeProductCodeInProductJson.js',
            //'test/specs/removeNameOfMedicinalProductInProductJson.js',
            // 'test/specs/removeInventedNameAndProductCodeInProductJson.js',
            // 'test/specs/removeInventedNameAndNameOfMedicinalProductInProductJson.js',
            // 'test/specs/removeProductCodeAndNameOfMedicinalProductInProductJson.js',
            // 'test/specs/removeInventedNameProductCodeAndNameOfMedicinalProductInProductJson.js',

            // 'test/specs/changeSNRecalledFlagInProductJson.js',
            // 'test/specs/changeSNDecommissionedFlagInProductJson.js',
            // 'test/specs/changeMarketIdInProductJson.js',
            // 'test/specs/enterIncorrectBatchExpiredFlagInProductJson.js',

            // 'test/specs/batchImport.js',
            // 'test/specs/removeProductCodeInBatchJson.js',
            // 'test/specs/removeBatchInBatchJson.js',
            // 'test/specs/removeExpiryDateInBatchJson.js',
            // 'test/specs/removeProductCodeAndBatchInBatchJson.js',
            // 'test/specs/removeProductCodeAndExpiryDateInBatchJson.js',
            // 'test/specs/removeBatchAndExpiryDateInBatchJson.js',
            // 'test/specs/removeProductCodeBatchAndExpiryDateInBatchJson.js',

            // 'test/specs/changeBatchRecallMsgFlagInBatchJson.js',
            // 'test/specs/enterSnRecalledInBatchJson.js',
            // 'test/specs/enterSnDecommissionedInBatchJson.js',
            // 'test/specs/enterSnValidInBatchJson.js',

            // 'test/specs/gtinPage.js',
            // 'test/specs/disableFeatures.js'


            //  'test/specs/invalidSsoLogin.js',
            //    'test/specs/validSsoLogin.js',
            //    'test/specs/reloginSsoAndOpenEpiUrlInNewTab.js',
            //    'test/specs/reloginSsoClearBrowserCookiesAndOpenEpiUrl.js',
            //    'test/specs/ssoLoginAndEnterpriseLogin.js'
        ],
    ],

    suites: {
        importJson: [
            [
                'test/specs/loginCredentials.js',
                // 'test/specs/productImport.js',
                // 'test/specs/removeInventedNameInProductJson.js',
                // 'test/specs/removeProductCodeInProductJson.js',
                // 'test/specs/removeNameOfMedicinalProductInProductJson.js',
                // 'test/specs/removeInventedNameAndProductCodeInProductJson.js',
                // 'test/specs/removeInventedNameAndNameOfMedicinalProductInProductJson.js',
                // 'test/specs/removeProductCodeAndNameOfMedicinalProductInProductJson.js',
                // 'test/specs/removeInventedNameProductCodeAndNameOfMedicinalProductInProductJson.js',

                // 'test/specs/changeSNRecalledFlagInProductJson.js',
                // 'test/specs/changeSNDecommissionedFlagInProductJson.js',
                // 'test/specs/changeMarketIdInProductJson.js',
                // 'test/specs/enterIncorrectBatchExpiredFlagInProductJson.js',

                // 'test/specs/batchImport.js',
                // 'test/specs/removeProductCodeInBatchJson.js',
                // 'test/specs/removeBatchInBatchJson.js',
                //'test/specs/removeExpiryDateInBatchJson.js',
                // 'test/specs/removeProductCodeAndBatchInBatchJson.js',
                // 'test/specs/removeProductCodeAndExpiryDateInBatchJson.js',
                // 'test/specs/removeBatchAndExpiryDateInBatchJson.js',
                // 'test/specs/removeProductCodeBatchAndExpiryDateInBatchJson.js',

                // 'test/specs/changeBatchRecallMsgFlagInBatchJson.js',
                // 'test/specs/enterSnRecalledInBatchJson.js',
                // 'test/specs/enterSnDecommissionedInBatchJson.js',
                'test/specs/enterSnValidInBatchJson.js',
            ]

        ]

    },

    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [
        {

            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 5,


            //
            browserName: 'chrome',
            // acceptInsecureCerts: true,
            'goog:chromeOptions': {
                prefs: {
                    'directory_upgrade': true,
                    'prompt_for_download': false,
                    'download.default_directory': downloadDir
                },
            }
            // If outputDir is provided WebdriverIO can capture driver session logs
            // it is possible to configure which logTypes to include/exclude.
            // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
            // excludeDriverLogs: ['bugreport', 'server'],
        },

        // {
        //     browserName: 'firefox',
        //     'moz:firefoxOptions': {
        //         args: ['-private']
        //       },
        // }
        //,
        // {
        //     browserName: 'safari'
        // }
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'trace',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    //
    baseUrl: 'https://epiqa.westeurope.cloudapp.azure.com/',
    //baseUrl: 'http://localhost:3000',

    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 400000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.

    // services: ['selenium-standalone'],
    services: ['chromedriver'],
    //services: ['browserstack'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],



    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 400000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */

    // ... previous configs ...
    // onPrepare: function (config, capabilities) {
    //   // make sure download directory exists
    //   if (!fs.existsSync(downloadDir)){
    //       // if it doesn't exist, create it
    //       fs.mkdirSync(downloadDir);
    //   }
    // },
    // ... rest of configs ...



    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {String} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
        browser.maximizeWindow();
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            browser.takeScreenshot();
        }

    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function rmdir(dir) {

    //    // console.log(dir)
    //         var list = fs.readdirSync(dir);
    //         for(var i = 0; i < list.length; i++) {
    //           var filename = path.join(dir, list[i]);
    //           var stat = fs.statSync(filename);

    //           if(filename == "." || filename == "..") {
    //             // pass these files
    //           } else if(stat.isDirectory()) {
    //             // rmdir recursively
    //             rmdir(filename);
    //           } else {
    //             // rm fiilename
    //             fs.unlinkSync(filename);
    //           }
    //         }
    //         fs.rmdirSync(dir);
    // },
    // function() {
    //   rmdir(downloadDir)
    // }
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}