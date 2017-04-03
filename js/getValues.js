/**
 * @author Sebastián Duque <sebastian.duque@payulatam.com>
 */
$(document).ready(function() {

    var query = location.search.substring(1);
    var queryFormat = query;

    // Evento el cual ejecuta la funcíon queryVariable al cargar la pagina.
    // Event which executes the function queryVariable when the page load.
    window.onload = queryVariable;
    window.onload = tableLog;

    // Creación y inicializaciòn de variables usando la función queryVariable
    // Creation and initialization of variables using the function queryVariable
    var merchantId = queryVariable("merchantId");
    var referenceCodeRequest = decodeURIComponent(queryVariable("referenceCode"));
    console.log(referenceCodeRequest);
    var referenceCode = referenceCodeRequest.replace('%3A', ':');
    referenceCode = referenceCodeRequest.replace('+', ' ');
    var transactionId = queryVariable("transactionId");
    var processingDate = moment().format('L, h:mm:ss a');
    var cus = queryVariable("cus");
    var pseBank = decodeURIComponent(queryVariable("pseBank"));
    var amount = queryVariable("TX_VALUE");
    var amountTrunc = truncate(amount, 1);
    var currency = queryVariable("currency");
    var description = queryVariable("description");
    var ipAddress = queryVariable("pseReference1");
    var transactionState = queryVariable("transactionState");
    var polResponseCode = queryVariable("polResponseCode");
    var lapPaymentMethodType = queryVariable("lapPaymentMethodType");
    var lapPaymentMethod = queryVariable("lapPaymentMethod");
    var signatureRequest = queryVariable("signature");

    // Comparación de firmas
    // Comparation of signatures
    var signatureGenerated = signatureGenerator(referenceCode, amountTrunc, currency, transactionState);
    console.log("Generador" + " " + signatureGenerated);
    console.log("Request" + " " + signatureRequest);

    if (signatureRequest != signatureGenerated) {
        $("#responseTable").hide();
        $("#buttons").hide();
        $("#responseDiv").append("<h1 class='text-center'>LA FIRMA DIGITAL NO ES VÁLIDA</h1>" + "<br>");


    } else {
        $("#responseTable").show();
    }


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
    $('#amount').html(amount + " " + queryVariable("currency"));
    $('#referencePol').html(queryVariable("reference_pol"));
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
        $('#trazabilityCode').html(queryVariable("trazabilityCode"));
    } else {
        console.log("No se habilitan campos extra");
    }

    // Asignation of class according to the state
    // Asignación de clase de acuerdo al estado
    $('tr:has(td:contains("aprobada"))').addClass('success');
    $('tr:has(td:contains("rechazada"))').addClass('danger');
    $('tr:has(td:contains("fallida"))').addClass('danger');
    $('tr:has(td:contains("pendiente"))').addClass('warning');

    // Asignación de valores sobre la tabla de logs.
    // Asignation of values to the log table
    function tableLog() {
        var parms = query.split('&');
        console.log("LOG" + "\n");
        for (var i = parms.length - 1; i >= 0; i--) {
            var pos = parms[i].indexOf('=');
            if (pos > 0) {
                var key = parms[i].substring(0, pos);
                var val = parms[i].substring(pos + 1);

                // Muestra en la consola el los valores de las variables
                // Show in the console log the values of the variables.
                console.log(key + ": " + val + "\n");

                if (val != "") {
                    $("#tableLog").append(" " + "<tr><td id='variable'>" + "<i class='glyphicon glyphicon-check'>" + " " + key + "</td>" + "<td id='value'>" + val + "</td></tr>");
                } else {
                    $("#tableLog").append(" " + "<tr><td id='variable'> " + "<i class='glyphicon glyphicon-unchecked'>" + " " + key + "</td>" + "<td id='value'>" + val + "</td></tr>");
                }
            }
        }
    };

    // Función para truncar los decimales de la variable amount
    // Function which truncate the decimal of amount variable
    function truncate(num, places) {
        return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
    }

    // Función que recibe el nombre de la variable y la busca en todos los parametros de la URL
    // Function which receives the name of the variable and searches it in the entire parameters from the URL
    function queryVariable(variable) {
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    };

    // Ocultar los datos GET de la URL
    // Hide the GET data from the URL
    function formatURL(queryFormat) {
        queryFormat = "d:/sebastian.duque/Documents/GitHub/Pagina-de-respuesta/PaginaRespuesta.html";
        history.pushState({}, 'The title', queryFormat);
    };
    formatURL(query);
});
