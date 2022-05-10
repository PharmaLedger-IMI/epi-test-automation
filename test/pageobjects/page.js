/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path) {
        //return browser.url(`https://the-internet.herokuapp.com/${path}`)
        return browser.url('/')

    }

    opensuburl(opensuburl) {

        //return browser.url('/')
        return browser.url('https://www.gs1.org/services/check-digit-calculator')


    }
    // opensuburlProduct(opensuburlProduct){

    //     return browser.url('https://epiqa.westeurope.cloudapp.azure.com/dsu-fabric-wallet/loader/?login')
    // }

}
