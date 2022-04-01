### Step 1: Clone the workspace

```sh
$ git clone https://github.com/PharmaLedger-IMI/epi-test-automation.git
```

After the repository was cloned, you must install all the dependencies.

```sh
$ cd epi-test-automation

$ npm install
```

### Step 2: Launch the "server"

While in the *epi-test-automation* folder run:

Run new product and new batch
```sh
$ npm run test
```
Run for existing product and existing batch or new batch
```sh
$ npm run test -- incrementalTest=true 
```
Created config.json file

### Step 3: Generate test report

After the above script has executed, run:

```sh
$ npm run report
```