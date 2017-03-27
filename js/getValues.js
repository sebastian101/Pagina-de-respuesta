/**
 * @author Sebastián Duque <sebastian.duque@payulatam.com>
 */

$(document).ready(function() {
    // Function which store in a variable the GET url and split the values of each field.
    function load(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    };

    // Event which executes the Function Load automatic
    window.onload = load;

    // Creation and initialization of variables using the function Load
    var merchantId = load("merchantId");
    var referenceCode = load("referenceCode");
    var transactionId = load("transactionId");
    var cus = load("cus");
    var pseBank = load("pseBank").replace(/%20/g, ' ');
    var amount = load("TX_VALUE");
    var currency = load("currency");
    var description = load("description");
    var ipAddress = load("pseReference1");
    var state = load("lapTransactionState");
    var lapPaymentMethodType = load("lapPaymentMethodType");
    var lapPaymentMethod = load("lapPaymentMethod");

    // Assignation of values in fields of the response page (mostrarCampos.html).
    

    // Show in the console log the values of the variables.
    console.log(merchantId + "\n");
    console.log(referenceCode + "\n");
    console.log(transactionId + "\n");
    console.log(cus + "\n");
    console.log(pseBank + "\n");
    console.log(amount + "\n");
    console.log(currency + "\n");
    console.log(description + "\n");
    console.log(ipAddress + "\n");
    console.log(state + "\n");
    console.log(lapPaymentMethodType + "\n");
    console.log(lapPaymentMethod + "\n");


});
