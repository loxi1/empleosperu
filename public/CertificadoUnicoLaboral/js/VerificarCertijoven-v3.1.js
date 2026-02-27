jQuery.validator.setDefaults({
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    }
});

$(document).ready(function () {
    $("#grdVerificacion").hide();

    $("#formCertiJoven").validate({
        rules: {
            txtNumeroCertijoven:
                {
                    required: true,
                    minlength: 11,
                    maxlength: 11,
                    number: true
                },
            txtNumeroRUC:
                {
                    required: true,
                    minlength: 11,
                    maxlength: 11,
                    number: true
                },
            txtDNI:
                {
                    required: true,
                    minlength: 8,
                    maxlength: 9,
                    number: true
                }
        },
        messages: {
            txtNumeroCertijoven:
                {
                    required: "Campo necesario.",
                    minlength: "Cantidad de d&iacute;gitos incorrectos.",
                    maxlength: "Cantidad de d&iacute;gitos incorrectos.",
                    number: "Ingrese n&uacute;meros."
                },
            txtNumeroRUC:
                {
                    required: "Campo necesario.",
                    minlength: "Cantidad de d&iacute;gitos incorrectos.",
                    maxlength: "Cantidad de d&iacute;gitos incorrectos.",
                    number: "Ingrese n&uacute;meros."
                },
            txtDNI:
                {
                    required: "Campo necesario.",
                    minlength: "Cantidad de d&iacute;gitos incorrectos.",
                    maxlength: "Cantidad de d&iacute;gitos incorrectos.",
                    number: "Ingrese n&uacute;meros."
                }
        }
    })

	var queryString = window.location.search;
	var params = {};

	var numeroCul = "";
	var numeroDoc = "";

	if (queryString) {
	    var queryParams = queryString.substring(1).split('&');

	    for (var i = 0; i < queryParams.length; i++) {
	        var param = queryParams[i].split('=');
	        var paramName = decodeURIComponent(param[0]);
	        var paramValue = decodeURIComponent(param[1]);
	        params[paramName] = paramValue;
	    }

		numeroCul = params["cul"];
		numeroDoc = params["numdoc"];
	}

	$("#txtNumeroCertijoven").val(numeroCul);
	$("#txtDNI").val(numeroDoc);
	$("#txtNumeroRUC").focus();

    $("#btnLimpiar").click(function () {
        $("#txtNumeroCertijoven").val("");
        $("#txtNumeroRUC").val("");
        $("#txtDNI").val("");
        $("#grdVerificacion").hide();

    });
    $("#btnVerificar").click(function () {

        $("#ajax-mensaje").hide();
        var validado = $("#formCertiJoven").valid();

        if (validado) {
            var numeroCertijoven = $("#txtNumeroCertijoven").val();
            var numeroRUC = $("#txtNumeroRUC").val();
            var numeroDNI = $("#txtDNI").val();
            var tipoDocumento = $("#cmbTipoDocumento").val();
            $("#loading").show();
            $("#grdVerificacion").css("display", "block");
            $("#loading").hide();
        }

    });

});

