$(document).ready(function () {

    //$('#myModal').hide();
    $('#loading-CUL').hide();
    $("#idperu").click(function () {
        const url = 'obtenerurl.html';
        const comboRazon = document.getElementById('razonCul');
        document.cookie="RAZON="+comboRazon.value;
        const otrosRazon = document.getElementById('detalleOtros');
        document.cookie="RAZON_OTROS="+encodeURIComponent(otrosRazon.value);
        $.ajax( {
             dataType: "json",
             url: url,
             async: false,
             success: function (data) {
                window.location.href = data.url;
             }
        });
    });

    $("#solicitar").click(function () {
        /*const comboEducacion = document.getElementById('nivelEducacion');
        if(comboEducacion.value=="1") {
            document.cookie="USAR_SUNEDU=1";
        } else {
            document.cookie="USAR_SUNEDU=0";
        }*/
        const comboRazon = document.getElementById('razonCul');
        document.cookie="RAZON="+comboRazon.value;
        const otrosRazon = document.getElementById('detalleOtros');
        document.cookie="RAZON_OTROS="+encodeURIComponent(otrosRazon.value);

        $("#solicitar").removeAttr("data-toggle", "modal");
        $("#solicitar").removeAttr("data-target", "#exampleModal");
        $('#loading-CUL').show();
        llamarFiltro();
    });

    $("#SolicitarCertijoven").click(function () {
        /*const comboEducacion = document.getElementById('nivelEducacion');
        if(comboEducacion.value=="1") {
            document.cookie="USAR_SUNEDU=1";
        } else {
            document.cookie="USAR_SUNEDU=0";
        }*/
        const comboRazon = document.getElementById('razonCul');
        document.cookie="RAZON="+ comboRazon.value;
        const otrosRazon = document.getElementById('detalleOtros');
        document.cookie="RAZON_OTROS="+encodeURIComponent(otrosRazon.value);
        $("#SolicitarCertijoven").removeAttr("data-toggle", "modal");
        $("#SolicitarCertijoven").removeAttr("data-target", "#exampleModal");
        $('#loading-CUL').show();
        llamarFiltro();
    });
    $("#btnGenerar").click(function () {
        $('#loading').show();
        gtag('event', 'certijoven confirmando solicitud del certificado', {
            'event_category': 'CERTIJOVEN_CONFIRMANDO',
            'event_label': 'confirmando solicitud del certificado'
        });
    });
    $("#refrescarHistorial").click(function () {
        window.location.href = 'Historial.html';
    });
    $('[data-toggle="tooltip"]').tooltip();
    const generarCul = document.getElementById('generarCul');
    if(generarCul!=null && generarCul.value == 'true') {
        $("#solicitar").removeAttr("data-toggle", "modal");
        $("#solicitar").removeAttr("data-target", "#exampleModal");
        $('#loading-CUL').show();
        llamarFiltro();
    }
});

function showPopup() {
  var popup = document.getElementById("LeyPopup");
  popup.classList.toggle("show");
}

function nextMsg() {
    if (messages.length == 0) {

    } else {
        // change content of message, fade in, wait, fade out and continue with next message
        $('#loading-text-value').html(messages.pop()).fadeIn(10).delay(1000).fadeOut(500, nextMsg);
    }
};

var messages = [
    "",
    "estamos obteniendo informaci\u00F3n de Identidad RENIEC / MIGRACIONES",
    "estamos obteniendo informaci\u00F3n de PNP",
    "estamos obteniendo informaci\u00F3n del Poder Judicial",
    "estamos obteniendo informaci\u00F3n de INPE",
    "estamos obteniendo informaci\u00F3n de MINEDU",
    "estamos obteniendo informaci\u00F3n de SUNEDU",
    "estamos obteniendo informaci\u00F3n de MTPE",
    "estamos obteniendo informaci\u00F3n de MINSA",
].reverse();

if ( document.getElementById('tipoDoc').value == 'CE' ) {
messages = [
    "",
    "estamos obteniendo informaci\u00F3n de Identidad RENIEC / MIGRACIONES",
    "estamos obteniendo informaci\u00F3n del Poder Judicial",
    "estamos obteniendo informaci\u00F3n de INPE",
    "estamos obteniendo informaci\u00F3n de SUNEDU",
    "estamos obteniendo informaci\u00F3n de MTPE",
    "estamos obteniendo informaci\u00F3n de MINSA",
].reverse();
}


if ( document.getElementById('tipoDoc').value == 'CPP' ) {
messages = [
    "",
    "estamos obteniendo informaci\u00F3n de Identidad RENIEC / MIGRACIONES",
    "estamos obteniendo informaci\u00F3n del Poder Judicial",
    "estamos obteniendo informaci\u00F3n de INPE",
    "estamos obteniendo informaci\u00F3n de SUNEDU",
    "estamos obteniendo informaci\u00F3n de MTPE",
].reverse();
}


function mostrarCampoOtros() {
  const select = document.getElementById('razonCul');
  const campoOtros = document.getElementById('otrosCampo');
  const campoOtrosLabel = document.getElementById('otrosCampoLabel');
  if (select.value === '11080103') {
    campoOtros.style.display = 'block';
    campoOtrosLabel.style.display = 'block';
  } else {
    campoOtros.style.display = 'none';
    campoOtrosLabel.style.display = 'none';
    document.getElementById('detalleOtros').value = '';
  }
}

function llamarFiltro() {
    let tabla = $("#filtroPIDE");
    tabla.empty();
    const url = 'solicitar.html';
    nextMsg();
    $.getJSON(url, function (data) {
        $('#loading-CUL').hide();
        if (Object.keys(data).length>0) {
            if (data.estadoRespuesta == 0) {
                $("#ajax-mensaje").show();
                $("#p-mensaje").html(data.mensajeRespuesta);
            } else if (data.estadoRespuesta == 2) {
                    var secuencia = (data.T*1)+1;
                    location.href = 'Certificado.html?numeroSecuencia='+secuencia;
            } else {
                $("#SolicitarCertijoven").attr("data-toggle", "modal");
                $("#SolicitarCertijoven").attr("data-target", "#exampleModal");
                document.cookie = "MOSTRAR_CONADIS=0";
                var servicioError = 0;
                var servicioObservado = 0;
                $.each(data.T, function (key, entry) {
                    var tipoDoc = document.getElementById('tipoDoc').value;
                    /*
                    alert(
                    'tipoDoc: ' + tipoDoc + '\n' +
                    'codigo: ' + entry.codigoServicio + '\n' +
                    'nombre: ' + entry.nombreServicio + '\n' +
                    'estado: ' + entry.codigoEstado + '\n' +
                    'mensajeErrorWeb: ' + entry.mensajeErrorWeb
                    );*/
                    if (entry.codigoEstado == 0 && !(entry.codigoServicio.indexOf('MINSA') > -1)) {
                        servicioError++;
                    }
                    if (entry.codigoServicio.indexOf('MINSA') > -1 || entry.nombreServicio.indexOf('Discapacidad') > -1) {
                        if (entry.codigoEstado == 1) {
                            $('#filtroPIDE').append('<div class="col-md-1"><span class="material-icons text-success">check_circle</span></div>' +
                                                    '<div class="col-md-11">' + entry.nombreServicio + '<br></div>');
                            $('#filtroPIDE').append('<div class="col-md-12">Según el servicio de consulta de certificado de discapacidad del MINSA, existe registro de un certificado vinculado a su documento de identidad.'
                             + '<br/><input type="checkbox" id="conadis"> Deseo que en el certificado único laboral se acredite la existencia de este certificado de discapacidad.</div>');

                            const checkbox = document.getElementById('conadis');
                            checkbox.addEventListener('change', (event) => {
                                if (event.currentTarget.checked) {
                                    document.cookie = "MOSTRAR_CONADIS=1";
                                } else {
                                    document.cookie = "MOSTRAR_CONADIS=0";
                                }
                            });
                        $('#filtroPIDE').append('<div class="col-md-12"><hr class="subguion"></div>');

                        } else if (entry.codigoEstado == -1) {
                            var appendPide = '<div class="col-md-1">';
                            appendPide = appendPide +
                                  '<span class="material-icons text-danger">cancel</span>' + '</div>' +
                                  '<div class="col-md-11">' + entry.nombreServicio + '<br><p class="problema">' + entry.mensajeErrorWeb + '</p>';
                            $('#filtroPIDE').append(appendPide + '</div>');
                            servicioError++;
                        $('#filtroPIDE').append('<div class="col-md-12"><hr class="subguion"></div>');
                        } else if (entry.codigoEstado == 0) {
                              //$('#filtroPIDE').append('<div class="col-md-1"><span class="material-icons text-success">check_circle</span></div>' +
                              //                        '<div class="col-md-11">' + entry.nombreServicio + '<br></div>');
                        }
                    } else if (entry.codigoServicio.indexOf('PJ') > -1 ) {
                        var appendPide = '<div class="col-md-1">';
                        if (entry.codigoGeneral == 1005 || entry.codigoGeneral == 1007) {
                            servicioObservado++;
                            if(entry.solicitudObservado == null) {
                                appendPide = appendPide +
                                    '<span class="material-icons text-warning">warning</span></div>' +
                                    '<div class="col-md-11">' + entry.nombreServicio;
                                appendPide = appendPide +
                                    '<br><b><p class="problema">El registro consultado est&aacute; observado</b></p>';
                                appendPide = appendPide +
                                    '<p class="problema">Según lo indicado por el PJ esto no implica necesariamente la existencia de antecedentes, siendo que el estado “observado” se genera cuando el nombre del solicitante presenta coincidencias y/o similitudes con personas inscritas en la base de datos del Registro Nacional de Condenas del Poder Judicial.<br/> ' +
                                     'Para comunicar su caso, por favor, diríjase al Poder Judicial a través de su mesa de partes virtual (<a target="_blank" href="https://sgd.pj.gob.pe/mpea/inicio">https://sgd.pj.gob.pe/mpea/inicio</a>) anexando su Certificado Único Laboral (se adjunta modelo para solicitar la revisión de su caso).' +
                                     '<a target="_blank" href="files/MODELO_SOLICITUD_PJ_CUL.docx">Ver propuesta de modelo de solicitud de verificación de información</a></p>';
                            } else {
                                if(entry.solicitudObservado.estadoSolicitud == 10830102) {
                                    appendPide = appendPide +
                                        '<span class="material-icons text-danger">cancel</span></div>' +
                                        '<div class="col-md-11">' + entry.nombreServicio;
                                    appendPide = appendPide +
                                            '<br><b><p class="problema">(*) El registro consultado est&aacute; observado</b></p>';
                                    appendPide = appendPide +
                                        '<p class="problema">Para mayor informaci&oacute;n por favor dirigirse a la sede m&aacute;s cercana del Poder Judicial. ' +
                                        '<br/><a target=”_blank” href="https://www.pj.gob.pe/wps/wcm/connect/69515f0041bb2ed1a6a1ee33346afa48/Donde+realizar+el+tramite+-+DIRECTORIO.pdf?MOD=AJPERES">Ver datos de oficinas disponibles</a>.' +
                                        '<br/>Cabe recordar que el Certificado &Uacute;nico Laboral solo puede reflejar la informaci&oacute;n oficial que  el Poder Judicial comparte al Ministerio de Trabajo y Promoci&oacute; del Empleo, por lo que nuestra instituci&oacute;n no puede cambiar dichos contenidos.</p>';
                                } else {
                                    appendPide = appendPide +
                                            '<span class="material-icons text-warning">warning</span></div>' +
                                            '<div class="col-md-11">' + entry.nombreServicio;
                                        appendPide = appendPide +
                                            '<br><b><p class="problema">El registro consultado est&aacute; observado</b></p>';
                                        appendPide = appendPide +
                                            '<p class="problema">Usted ingres&oacute; una solicitud al PJ de n&uacute;mero ' + entry.solicitudObservado.solicitudFormateado + ' en fecha ' + entry.solicitudObservado.fechaSolicitud + ' que aún no fue atendida.</a></p>';
                                }
                            }
                        } else {
                            if(
                                (tipoDoc=='CPP' && (entry.codigoServicio=='PNP' || entry.codigoServicio=='MINEDU' || entry.codigoServicio=='MINSA'))
                                ||
                                (tipoDoc=='CE' && (entry.codigoServicio=='PNP' || entry.codigoServicio=='MINEDU'))
                                ) {
                            } else {
                                appendPide = appendPide +
                                    (entry.codigoEstado == 1 ? '<span class="material-icons text-success">check_circle</span>' : '<span class="material-icons text-danger">cancel</span>') + '</div>' +
                                    '<div class="col-md-11">' + entry.nombreServicio + '<br><p class="problema">' + entry.mensajeErrorWeb + '</p>';
                            }
                        }
                        $('#filtroPIDE').append(appendPide + '</div>');
                        $('#filtroPIDE').append('<div class="col-md-12"><hr class="subguion"></div>');
                    } else if (entry.codigoServicio.indexOf('INPE') > -1 ) {
                        var appendPide = '<div class="col-md-1">';
                        if (entry.codigoGeneral == 1006 || entry.codigoGeneral == 1007) {
                            servicioObservado++;
                            appendPide = appendPide +
                                '<span class="material-icons text-warning">warning</span></div>' +
                                '<div class="col-md-11">' + entry.nombreServicio;
                            appendPide = appendPide +
                                '<br><b><p class="problema">(*) El registro consultado est&aacute; observado</b></p>';
                            appendPide = appendPide +
                                '<p class="problema">Según lo indicado por el INPE esto no implica necesariamente la existencia de antecedentes, siendo que el estado “observado” se genera cuando el nombre del solicitante presenta coincidencias y/o similitudes con personas inscritas en la base de datos del Registro Penitenciario o cuando registra inscripción de antecedente judicial vigente o cancelado.<br/>Para comunicar su caso, por favor, diríjase al INPE a través de su mesa de partes virtual (<a href="https://mesadepartes.inpe.gob.pe/" target="_blank">https://mesadepartes.inpe.gob.pe/</a>) anexando su Certificado Único Laboral (se adjunta modelo para solicitar la revisión de su caso).' +
                                 '<br/><a target=”_blank” href="files/MODELO_SOLICITUD_INPE_CUL.docx">Ver propuesta de modelo de solicitud de verificación de información</a></p>';
                        } else {
                            appendPide = appendPide +
                                (entry.codigoEstado == 1 ? '<span class="material-icons text-success">check_circle</span>' : '<span class="material-icons text-danger">cancel</span>') + '</div>' +
                                '<div class="col-md-11">' + entry.nombreServicio + '<br><p class="problema">' + entry.mensajeErrorWeb + '</p>';
                        }
                        $('#filtroPIDE').append(appendPide + '</div>');
                        $('#filtroPIDE').append('<div class="col-md-12"><hr class="subguion"></div>');
                    } else {
                        if(
                            (tipoDoc=='CPP' && (entry.codigoServicio=='PNP' || entry.codigoServicio=='MINEDU' || entry.codigoServicio=='MINSA'))
                            ||
                            (tipoDoc=='CE' && (entry.codigoServicio=='PNP' || entry.codigoServicio=='MINEDU'))
                            ) {
                        } else {
                            $('#filtroPIDE').append('<div class="col-md-1">' + (entry.codigoEstado == 1 ? '<span class="material-icons text-success">check_circle</span>' : '<span class="material-icons text-danger">cancel</span>') + '</div>\n' +
                                                '<div class="col-md-11">' + entry.nombreServicio + '<br><p class="problema">' + entry.mensajeErrorWeb + '</p></div>' +
                                                '<div class="col-md-12"><hr class="subguion"></div>');
                        }
                    }
                })
                if (servicioError > 0) {
                    $('#filtroPIDE').append('<div class="col-md-11">Si ud. lo desea puede descargar el certificado, pero sin la información señalada.</div>')
                }
                if (servicioObservado > 0) {
                    $('#filtroPIDE').append('<div class="col-md-11">(*) Si ud. decide descargar el certificado, en el documento emitido figurará el texto <i>"SE REQUIERE ACTUALIZAR ESTA INFORMACIÓN"</i>&nbsp;en el campo de antecedente observado.</div>')
                }
                $('#exampleModal').modal('show');
            }
        } else {
            $("#ajax-mensaje").show();
            $("#p-mensaje").html("Estamos presentando algunos problemas con uno de nuestros servicios. Vuelva a intentar en unos minutos.");
        }
        $('#loading-CUL').hide();
    });
}
