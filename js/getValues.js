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

    // Evento el cual ejecuta la funcíon load al cargar el documento.
    window.onload = load;

    // Creación y inicializaciòn de variables usando la función Load
    // Creation and initialization of variables using the function Load
    var merchantId = load("merchantId");
    var referenceCode = load("referenceCode");
    var transactionId = load("transactionId");
    var processingDate = moment().format('L, h:mm:ss a');
    var cus = load("cus");
    var pseBank = decodeURIComponent(load("pseBank"));
    var amount = load("TX_VALUE");
    var currency = load("currency");
    var description = load("description");
    var ipAddress = load("pseReference1");
    var transactionState = load("transactionState");
    var polResponseCode = load("polResponseCode");
    var lapPaymentMethodType = load("lapPaymentMethodType");
    var lapPaymentMethod = load("lapPaymentMethod");

    // Muestra en la consola el los valores de las variables
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

    // Controlador de posibles valores de estados de la transacción
    // Controller of possible values of states of transaction
    var state;
    if (transactionState == 4 && polResponseCode == 1) {
        state = "Transacción aprobada";
    } else if (transactionState == 6) {
        if (polResponseCode == 5) {
            state = "Transacción fallida";

        } else {
            state = "Transacción rechazada";
        }
    } else if (transactionState == 7) {
        state = "Transacción pendiente, por favor revisar si el débito fue realizado en el banco.";
    } else if (transactionState == 5) {
        state = "Expirada";
    } else {
        state = "Error";
    }



    // Asignación de valores en campos de la pagina de respuesta (PaginaRespuesta.html).
    // Assignation of values in fields of the response page (PaginaRespuesta.html).
    $('#processingDate').html($.now());
    $('#state').html(state);
    $('#referenceCode').html(referenceCode);
    $('#processingDate').html(processingDate);
    $('#amount').html(amount + " " + load("currency"));
    $('#referencePol').html(load("reference_pol"));
    $('#description').html(description);
    $('#paymentMethod').html(lapPaymentMethod);

    if (lapPaymentMethod == "PSE") {
        $("#trCus").show();
        $("#trPseBank").show();
        $("#trIpAddress").show();
        $('#cus').html(cus);
        $('#pseBank').html(pseBank);
        $('#ipAddress').html(ipAddress);
    } else if (lapPaymentMethodType == "CREDIT_CARD" && transactionState == 4) {
        $("#trTrazabilityCode").show();
        $('#trazabilityCode').html(load("trazabilityCode"));
    } else {
        console.log("No se habilitan campos extra");
    }
    window.onload = tableLog;
    // asignación de valores sobre la tabla de logs.
    // Asignation of values to the log table  
    function tableLog() {
        var query, parms, i, pos, key, val;
        query = location.search.substring(1);
        parms = query.split('&');
        for (i = parms.length - 1; i >= 0; i--) {
            pos = parms[i].indexOf('=');
            if (pos > 0) {
                key = parms[i].substring(0, pos);
                val = parms[i].substring(pos + 1);
                if (val != "") {
                    $("#tableLog").append("<tr><td id='variable'>" + "<i class='glyphicon glyphicon-check'>" + " " + key + "</td>" + "<td id='value'>" + val + "</td></tr>");
                } else {
                    $("#tableLog").append("<tr><td id='variable'> " + "<i class='glyphicon glyphicon-unchecked'>" + " " + key + "</td>" + "<td id='value'>" + val + "</td></tr>");
                }
            }
        }
    };
});
