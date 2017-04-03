    function signatureGenerator(referenceCodeRequest, amountRequest, currencyRequest, transactionStateRequest) {
        // Credentials
        var apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
        var merchanId = "508029";
        var accountId = "512321";

        // Get information of the form
        var reference = referenceCodeRequest;
        var amount = amountRequest;
        var currency = currencyRequest;
        var transactionState = transactionStateRequest;

        // Signature MD5 generator
        var signature = String(CryptoJS.MD5(apiKey + "~" + merchanId + "~" + reference + "~" + amount + "~" + currency + "~" + transactionState));
        return signature;

        // Console log signature value
        console.log(signature);
    };
