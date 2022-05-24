### Step 1: Clone the epi-test-automation workspace

```sh
$ git clone https://github.com/PharmaLedger-IMI/epi-test-automation.git
```

After the repository was cloned, you must install all the dependencies.

```sh
$ cd epi-test-automation

$ npm install
```
### Step 2: Clone the epi-workspace only if application is not working(optional)
```sh
Visit this link "https://github.com/PharmaLedger-IMI/epi-workspace#readme" and follow the steps
To clone new version
$ git checkout <version>
```

### Register new account in demiurge wallet

```
Go to ePI application and register a demiurge user

1. Open your Demiurge wallet and go to new account and register
2. Navigate to the Groups page
3. Select ePI admin group
4. Input the user DID that needs admin priviledges
5. Click add button.
```


### Step 3: Do following changes in epi-test-automation folder

Go to epi-test-automation-->wdio.conf.js and change baseUrl as per local or QA
```
1. QA baseUrl: 'https://epiqa.westeurope.cloudapp.azure.com/',
2. Local baseUrl: 'http://localhost:<port number>'
//example: port number=3000 or 8080(default)
```
if you want to change port number
1. Go to epi-workspace-->external-volume-->apihub.json-->port=3000
2. Go to epi-workspace-->env.json
   ->add "BDNS_ROOT_HOSTS" :"http://localhost:3000"

### Provide details in config.json file
Go to epi-test-automation-->test-->testData-->config.json
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

7. Provide path details
   change dir path for matrixImage and testExpectation 
   // if android studio is available then generate image in below path to scan barcode using mobile 
   1. matrixImage: <system user>/AppData/Local/Android/Sdk/emulator/resources/custom.png
   // To validate assertions, store all expected data in json file
   2. testExpectation: <system user>/epi-mobileapp-test-automation/test/testdata/testExpectations.json
   3. Product and batch import path has been set to upload json file

  



### Step 5: Launch the "server"

While in the *epi-test-automation* folder run:

Run new product and new batch
```sh
$ npm run test --browserOnly
```
Run for existing product and existing batch or new batch
```sh
$ npm run test --incremental
```
Run for existing product and existing batch in browser
```sh
$ npm run test --incremental --browserOnly
``` 

To run suite
```sh
$ npx wdio run wdio.conf.js --suite importJson
``` 

Created config.json file

### Step 3: Generate test report

After the above script has executed, run:

```sh
$ npm run report
```

