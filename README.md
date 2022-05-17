### Step 1: Clone the epi-test-automation workspace

```sh
$ git clone https://github.com/PharmaLedger-IMI/epi-test-automation.git
```

After the repository was cloned, you must install all the dependencies.

```sh
$ cd epi-test-automation

$ npm install
```
### Step 2: Clone the epi-workspace 
```sh
Visit this link "https://github.com/PharmaLedger-IMI/epi-workspace#readme" and follow the steps
To clone new version
$ git checkout <version>
```
### Step 3: To setup project
1. Download visual studio: "https://code.visualstudio.com/download" and install
2. Go to Visual studio-->File-->Add folder to your workspace
3. Import epi-test-automation and epi-workspace folder to your workspace

### Step 4: Do following changes in epi-test-automation folder
```
Go to config.json file in testdata folder and change dir path for matrixImage and testExpectation
//To scan barcode using mobile generate image in below path
1. matrixImage: <system user>/AppData/Local/Android/Sdk/emulator/resources/custom.png
//To validate assertions, store all expected data in json file
2. testExpectation: <system user>/epi-mobileapp-test-automation/test/testdata/testExpectations.json
```
Go to wdio.conf.js and change baseUrl as per local or QA
```
1. QA baseUrl: 'https://epiqa.westeurope.cloudapp.azure.com/',
2. Local baseUrl: 'http://localhost:<port number>'
//example: port number=3000 or 8080(default)
```
if you want to change port number
1. Go to epi-workspace-->external-volume-->apihub.json-->port=3000
2. Go to epi-workspace-->env.json
   ->add "BDNS_ROOT_HOSTS" :"http://localhost:3000"
```
Go to ePI application and register devuser

1. Open your Demiurge wallet and go to new account and register
2. Navigate to the Groups page
3. Select ePI admin group
4. Input the user DID that needs admin priviledges
5. Click add button.
```

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

