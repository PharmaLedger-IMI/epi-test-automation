
class digits {

    get acceptCookies() {

        return $("//div//button[@id='onetrust-accept-btn-handler']")

    }
    get digitInputField() {
        return $("//input[@id='digit']")
    }
    get calculateButton() {
        return $("//button[@id='edit-submit']")
    }
    get number() {
        return $("//span[@id='check_digit_result_gtinoriginal-number']")
    }
    get code() {
        return $("div[id='check_digit_result_gtinoriginal'] div[class='check-digit-size size-lg']")
    }

    async clickCookie() {

        await this.acceptCookies.click();
    }
    async enterDigits(gtn) {

        await this.digitInputField.click();
        await this.digitInputField.setValue(gtn);
    }
    async clickCalculate() {
        await this.calculateButton.click();
        await this.calculateButton.scrollIntoView()
    }
    async copyGtin() {

        const checkDigit = await this.number.getText() + await this.code.getText();
        //console.log("concat is "+checkdigit);
        return checkDigit
    }

}

module.exports = new digits();