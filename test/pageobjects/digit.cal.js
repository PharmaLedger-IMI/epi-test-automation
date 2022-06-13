
class digits {

    //cookies
    get acceptCookies() {

        return $("//div//button[@id='onetrust-accept-btn-handler']")

    }
    //input field box
    get digitInputField() {
        return $("//input[@id='digit']")
    }
    //calculate button
    get calculateButton() {
        return $("//button[@id='edit-submit']")
    }
    //gtin number
    get number() {
        return $("//span[@id='check_digit_result_gtinoriginal-number']")
    }

    get code() {
        return $("div[id='check_digit_result_gtinoriginal'] div[class='check-digit-size size-lg']")
    }
    //click cookie
    async clickCookie() {

        await this.acceptCookies.click();
    }
    //enter 14 digits in input field
    async enterDigits(gtn) {

        await this.digitInputField.click();
        await this.digitInputField.setValue(gtn);
    }
    //click calculate button
    async clickCalculate() {
        await this.calculateButton.click();
        await this.calculateButton.scrollIntoView()
    }
    //copy gtin
    async copyGtin() {

        const checkDigit = await this.number.getText() + await this.code.getText();
        //console.log("concat is "+checkdigit);
        return checkDigit
    }

}

module.exports = new digits();