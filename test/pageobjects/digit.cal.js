



class digits {

    get cookie123() {
        return $("//div//button[@id='onetrust-accept-btn-handler']")

    }
    get digitinput() {
        return $("//input[@id='digit']")
    }
    get calculate() {
        return $("//button[@id='edit-submit']")
    }
    get copy() {
        return $("(//span[@data-toggle='tooltip'])[1]")
    }
    get number() {
        return $("//span[@id='check_digit_result_gtinoriginal-number']")
    }
    get code() {
        return $("div[id='check_digit_result_gtinoriginal'] div[class='check-digit-size size-lg']")
    }



    async clickCookie() {

        await this.cookie123.click();
    }
    async digitenter(gtn) {

        await this.digitinput.click();
        await this.digitinput.setValue(gtn);


    }
    async caldigit() {
        await this.calculate.click();
        await this.calculate.scrollIntoView()
    }
    async copydigit() {
        await this.copy.click();

    }
    async numbercopy() {

        const value1 = await this.number.getText();
        console.log("value1 is " + value1);

    }
    async codeCopy() {

        const value2 = await this.code.getText();
        console.log("value2 is " + value2);

    }


    async concat1() {

        const checkdigit = await this.number.getText() + await this.code.getText();
        //console.log("concat is "+checkdigit);
        return checkdigit
    }

}

module.exports = new digits();