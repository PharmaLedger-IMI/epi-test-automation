This is the repository which contains scripts to test Enterprise Wallet of the ePI application. This repo works in tandem with https://github.com/PharmaLedger-IMI/epi-mobileapp-test-automation which contains scripts to test corresponding mobile app scenarios. Tests have been designed in a way so that first browser related steps will be performed by the script and then relevant mobile app test script will be executed for a given scenario. It's mandatory to install and complete all pre-requisite steps for mobile app repo as well if the entire framework has to run end to end.

### Step 1: Clone the epi-test-automation workspace

```sh
$ git clone https://github.com/PharmaLedger-IMI/epi-test-automation.git
```

After the repository was cloned, you must install all the dependencies.

```sh
$ cd epi-test-automation

$ npm install
```
### Step 2: (Optional) Clone and run epi-workspace
```sh
Visit this link "https://github.com/PharmaLedger-IMI/epi-workspace#readme" and follow the steps
To clone new version
$ git checkout <version>
```

### Step 3: Clone and install epi-mobileapp-test-automation repository
Install this repo at the same folder level where epi-test-automation is installed
```sh
Visit this link "https://github.com/PharmaLedger-IMI/epi-mobileapp-test-automation#readme" and follow the steps
```


### Step 4: Make necessary test configuration changes

If ePI application is running on port number say 3000
1. Go to epi-workspace > external-volume > apihub.json file and change ```port=3000``` property
2. Go to epi-workspace > env.json and add ```"BDNS_ROOT_HOSTS":"http://localhost:3000"```
3. Go to epi-test-automation-->wdio.conf.js and change ```baseUrl``` as per localhost or QA link
e.g. ```baseUrl: 'http://localhost:3000'```

**Note**: if ePI application is running on localhost, then during testing mobile-app tests will fail to execute unless ePI mobile app has been configured to access apihub server running on localhost 


### Step 5: Register demiurge user 

If not already registered, go to ePI application and register a demiurge user

1. Open your Demiurge wallet and go to new account and register
2. Navigate to the Groups page
3. Select ePI admin group
4. Input the user DID that needs admin priviledges
5. Click add button

### Step 6: Setup user and data details

Go to epi-test-automation > test > testData > config.json

1. Provide login details
   -Set automationUserName with registered user name   
   -Set invalid username, invalid password, vault value

2. Provide demiurge login details
   -Set registered demiurge user name, new demiurge user name, email id, valid password, confirm password, company name value

3. Provide enterprise login details
   -Set new demiurge user name, email id, valid password, confirm password value

4. Provide new product details
   -Set brand name, medicinal product name, internal material code, add strength, video source, batch message value

5. Provide new batch details
   -Set site name, internal material code, add strength, video source, batch message, recall message value
   
6. Provide incremental test details
   -Set product id, batch id, expiry date, serial number, product name value

7. Provide file path details for following:  
   If Android Studio is available, then 2D data matrix image will be generated in below path to be able to be picked up by Android Emulator during scanning ```matrixImage: <system user>/AppData/Local/Android/Sdk/emulator/resources/custom.png```
  
   For mobile app assertions, browser scripts will generate assertion file at below location. This will then be used by mobile app scripts to assert on expected values
   ```testExpectation: <system user>/epi-mobileapp-test-automation/test/testdata/testExpectations.json```
   
   Product and batch import path has been set to upload json file  
   ```"productImport": "../epi-test-automation/test/testdata/sampleProductImport.json"```  
   ```"batchImport": "../epi-test-automation/test/testdata/sampleBatchImport.json"```
 

   
### Step 7: Run the server

While in the *epi-test-automation* folder run:

Run new product and new batch in "browser only" mode. No mobile app tests will be triggered if this flag is passed
```sh
$ npm run test --browserOnly
```
Run for an existing product and a new / existing batch (both browser and mobile app tests will be triggered)
```sh
$ npm run test --incremental
```
Run for existing product and existing batch in browser
```sh
$ npm run test --incremental --browserOnly
``` 

To run just import JSON feature related tests
```sh
$ npx wdio run wdio.conf.js --suite importJson
``` 


### Step 8: Generate test report

```sh
$ npm run report
```

