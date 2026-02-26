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
        $("#filtroCertificado").empty();
        $("#grdVerificacion").hide();

    });
    $("#btnVerificar").click(function () {
        gtag('event', 'certijoven consultando el certificado por las empresas', {
            'event_category': 'CERTIJOVEN_CONSULTANDO',
            'event_label': 'consultando el certificado por las empresas'
        });
        $("#ajax-mensaje").hide();
        var validado = $("#formCertiJoven").valid();

        if (validado) {
            $("#filtroCertificado").empty();


            var numeroCertijoven = $("#txtNumeroCertijoven").val();
            var numeroRUC = $("#txtNumeroRUC").val();
            var numeroDNI = $("#txtDNI").val();
            var tipoDocumento = $("#cmbTipoDocumento").val();
            $("#loading").show();

            var url = 'buscarCertiJoven.html';
            $.getJSON(url, {
                numeroCertijoven: numeroCertijoven,
                numeroRUC: numeroRUC,
                tipoDocumento: tipoDocumento,
                numeroDNI: numeroDNI
            }, function (data) {
                if (data.estadoRespuesta == 2) {
                    $("#grdVerificacion").show();
                    $('#filtroCertificado').append('<div class="col-md-2"><span class="titulo-responsive">N° de certificado</span><p>' + data.T.a_numdocume + '</p></div>' +
                        '<div class="col-md-2"><span class="titulo-responsive">Fecha de emisión</span><p>' + data.T.a_fecoperac + '</p></div>' +
                        '<div class="col-md-4"><span class="titulo-responsive">Apellidos y nombres</span><p>' + data.T.v_apellpat + ' ' + data.T.v_apellmat + ' ' + data.T.v_nombres + '</p></div>' +
                        '<div class="col-md-2"><span class="titulo-responsive">Estado</span><p>' + (data.T.esVigente == 1 ? 'Vigente' : 'No vigente') + '</p></div>' +
                        '<div class="col-md-2">' + '<a target="_blank" href="Ver.html?numeroDni=' + data.T.vNuDocNacimiento + '&numeroSecuencia=' + data.T.a_numsecuen + '&tipoDocumento=' + tipoDocumento +'" class="btn btn-primary btn-sm"><span class="material-icons">visibility</span> Ver</a>' + '</div>' +
                        '<div class="col-12"><hr class="subguion"></div>');
                } else {
                    $("#grdVerificacion").hide();
                    $("#ajax-mensaje").show();
                    $("#p-mensaje").html(data.mensajeRespuesta);
                }
                $("#loading").hide();
            });
        }

    });

});

