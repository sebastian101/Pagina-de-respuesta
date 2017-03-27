$(document).ready(function() {
    $("#post").click(function() {
		
		// Credentials
        var apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
        var merchanId = "508029";
        var accountId_ = "512321";
		
		// Get information of the form
        var amount = document.getElementById('amount').value;
        var currency = document.getElementById('currency').value;
        var time_ = $.now();
        document.getElementById('referenceCode').value = time_;
		
		// Signature MD5 generator
        var signature = String(CryptoJS.MD5(apiKey + "~" + merchanId + "~" + time_ + "~" + amount + "~" + currency));
        document.getElementById('signature').value = signature;
		
		// Console log of the references and signature values
        console.log(time_);
        console.log(signature);
		
		// Action for post
        document.getElementById('form').submit();
    });
});