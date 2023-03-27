var nIntervId = 0;

var cuenta = {};
var arrCuenta = [];

var personales = {};
var arrpersonales = [];

var pagos = {};
var arrpagos = [];

$(document).ready(function () {
  cargarFondos();
  obtenerCotizacionDolar();

  cargarFecha();

  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;

  $("#proximoAcount").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    if (validarAccount()) {
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              display: "none",
              position: "relative",
            });
            next_fs.css({ opacity: opacity });
          },
          duration: 600,
        }
      );
    }
  });

  $("#proximoInformacionPersonal").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    if (validarInformacionPersonal()) {

      console.log(arrpersonales)
      
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              display: "none",
              position: "relative",
            });
            next_fs.css({ opacity: opacity });
          },
          duration: 600,
        }
      );
    }
  });

  $("#confirmar").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    if (validarPagos()) {
        console.log(arrpagos)
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              display: "none",
              position: "relative",
            });
            next_fs.css({ opacity: opacity });
          },
          duration: 600,
        }
      );
    }
  });

  /* $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  }); */

  $("#previousAcount").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

     cuenta = {};
     arrCuenta = [];

    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  $("#previousInformacionPersonal").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

     personales = {};
     arrpersonales = [];

    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });




  $(".radio-group .radio").click(function () {
    $(this).parent().find(".radio").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".submit").click(function () {
    return false;
  });

  function validarAccount() {
    let mailValido;
    let usuarioValido;
    let passValido;
    let cpassValido;
    let cpassValidoLong;

    email = $("#email").val();
    usuario = $("#userName").val();
    password = $("#password").val();
    cpassword = $("#cpassword").val();

    //Valido MAIL
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {
      mailValido = true;
      if (usuario.length > 3) {
        usuarioValido = true;
        if (password.length > 3) {
          passValido = true;

          if (cpassword.length > 3) {
            cpassValidoLong = true;
            if (password === cpassword) {
              cuenta = {
                email: email,
                usuario: usuario,
                password: password,
                cpassword: cpassword,
              };
              arrCuenta.push(cuenta);
              var ok = "si";
              return "true";
            } else {
              cpassValido = false;
            }
          } else {
            cpassValidoLong = false;
          }
        } else {
          passValido = false;
        }
      } else {
        usuarioValido = false;
      }
    } else {
      mailValido = false;
    }

    if (mailValido == false) {
      Swal.fire({
        icon: "info",
        title: "MAIL invalido.",
      });
    }

    if (usuarioValido == false) {
      Swal.fire({
        icon: "info",
        title: "ingrese el USUARIO",
      });
    }
    if (passValido == false) {
      Swal.fire({
        icon: "info",
        title: "ingrese el PASSWORD",
      });
    }

    if (cpassValido == false) {
      Swal.fire({
        icon: "info",
        title: "No coincide el PASSWORD con la CONFIRMACION.",
      });
    }

    if (cpassValidoLong == false) {
      Swal.fire({
        icon: "info",
        title: "Ingrese la confirmacion del PASSWORD.",
      });
    }
  }

  function validarInformacionPersonal() {
    let nombreValido;
    let apellidoValido;
    let telValido;
    let celValido;
    let autoValido;
    let fechaInicioValido;
    let fechaFinValido;

    fname = $("#fname").val();
    lname = $("#lname").val();
    tel = $("#tel").val();
    cel = $("#cel").val();
    auto = $("#autos option:selected").text();
    fechaInicio = $("#datepickerInicio").val();
    fechaFin = $("#datepickerFin").val();

    importePago=$("#importe").val();
    

    if (fname.length > 3) {
      nombreValido = true;
      if (lname.length > 3) {
        apellidoValido = true;

        telRegex = /^([0-9]{4,5})+(-)+([0-9]{7,8})$/i;
        if (telRegex.test(tel)) {
          telValido = true;

          callRegex = /^([0-9]{4,5})+(-)+([0-9]{7,8})$/i;
          if (callRegex.test(cel)) {
            celValido = true;

            if (auto.length > 5 && auto != "Seleccione") {
              autoValido = true;

              if (fechaInicio.length > 0) {


                fechaInicioValido = true;

                  if  (fechaFin.length > 0) {
                      fechaFinValido = true;
                      personales = {
                        fname: fname,
                        lname: lname,
                        tel: tel,
                        cel: cel,
                        auto: auto,
                        fechaInicio: fechaInicio,
                        fechaFin:fechaFin,
                        importePago:importePago
                      };
                      arrpersonales.push(personales);
                      var ok = "si";
                      return "true";
                } else {
                  fechaFinValido = false;
                }
              } else {
                fechaInicioValido = false;
              }
            } else {
              autoValido = false;
            }
          } else {
            celValido = false;
          }
        } else {
          telValido = false;
        }
      } else {
        apellidoValido = false;
      }
    } else {
      nombreValido = false;
    }

    if (nombreValido == false) {
      Swal.fire({
        icon: "info",
        title: "Ingrese El NOMBRE.",
      });
    }

    if (apellidoValido == false) {
      Swal.fire({
        icon: "info",
        title: "Ingrese El APELLIDO.",
      });
    }

    if (telValido == false) {
      Swal.fire({
        icon: "info",
        title: "Telefono invalido.",
      });
    }

    if (celValido == false) {
      Swal.fire({
        icon: "info",
        title: "Celular invalido.",
      });
    }

    if (autoValido == false) {
      Swal.fire({
        icon: "info",
        title: "seleccione un VEHICULO.",
      });
    }

    if (fechaInicioValido == false) {
      Swal.fire({
        icon: "info",
        title: "Seleccione una FECHA INICIO DE RESERVA.",
      });
    }

    if (fechaFinValido == false) {
      Swal.fire({
        icon: "info",
        title: "Seleccione una FECHA FINALIZACION DE RESERVA.",
      });
    }
  }
});

function validarPagos() { 
  let titularValido;
  let numeroTarjetaValido;
  let cvcValido;
  let mesValido;
  let anioValido;

  titular = $("#titularTarjeta").val();
  numeroTarjeta = $("#numeroTarjeta").val();
  cvc = $("#cvcpwd").val();
  mes = $("#month option:selected").text();
  anio = $("#year option:selected").text();

  if (titular.length > 5) {
    titularValido = true;
    if (numeroTarjeta.length == 16) {
      numeroTarjetaValido = true;

      cvcRegex = /^[0-9]*(\.?)[ 0-9]+$/i;
      if (cvc.length == 3 && cvcRegex.test(cvc)) {
        cvcValido = true;

        if (mes.length > 3 && mes != "Seleccione Mes") {
          mesValido = true;

          if (anio.length > 3 && anio != "Seleccione Año") {
            anioValido = true;

            if ($("#tarjCredito").is(":checked")){
                tarjCredito=true;

            }else{
                tarjCredito=false;
            }

            if ($("#tarjDebito").is(":checked")){
                tarjDebito=true;

            }else{
                tarjDebito=false;
            }

            pagos={
                tarjCredito:tarjCredito,
                tarjDebito:tarjDebito,
                titularTarjeta:titular,
                numeroTarjeta:numeroTarjeta,
                cvcpwd:cvc,
                mes:mes,
                anio:anio
            }
            arrpagos.push(pagos);


            var ok = "si";
            return "true";
          } else {
            anioValido = false;
          }
        } else {
          mesValido = false;
        }
      } else {
        cvcValido = false;
      }
    } else {
      numeroTarjetaValido = false;
    }
  } else {
    titularValido = false;
  }

  if (titularValido == false) {
    Swal.fire({
      icon: "info",
      title: "Ingrese el TITULAR de la TARJETA.",
    });
  }

  if (numeroTarjetaValido == false) {
    Swal.fire({
      icon: "info",
      title: "Numero de TARJETA, debe contener 16 digitos.",
    });
  }

  if (cvcValido == false) {
    Swal.fire({
      icon: "info",
      title: "Numero de CVC, debe contener 3 digitos.",
    });
  }

  if (mesValido == false) {
    Swal.fire({
      icon: "info",
      title: "Seleccione el MES.",
    });
  }
  if (anioValido == false) {
    Swal.fire({
      icon: "info",
      title: "Seleccione el ANIO.",
    });
  }
}

async function obtenerCotizacionDolar() {
  await fetch("https://api.bluelytics.com.ar/v2/latest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      let bodyDolar = "";
      bodyDolar = `<tr>
                    <th> ${extraerCadena(res.last_update)}</th>
                    <td>${res.oficial.value_buy}</td>
                    <td>${res.oficial.value_sell}</td>            
                </tr>`;

      $("#cotizadorDolar").html(bodyDolar);
    });
}

function cargarFondos() {
  setInterval(cambiarFondo, 5000);
}

function cambiarFondo() {
  nIntervId++;

  if (nIntervId % 3 == 0) {
    $("#fondoPantalla").removeClass("fondoPantalla1");
    $("#fondoPantalla").removeClass("fondoPantalla2");
    $("#fondoPantalla").addClass("fondoPantalla3");
  } else if (nIntervId % 2 == 0) {
    $("#fondoPantalla").removeClass("fondoPantalla2");
    $("#fondoPantalla").removeClass("fondoPantalla3");
    $("#fondoPantalla").addClass("fondoPantalla1");
  } else if (nIntervId % 2 != 0) {
    $("#fondoPantalla").removeClass("fondoPantalla1");
    $("#fondoPantalla").removeClass("fondoPantalla3");
    $("#fondoPantalla").addClass("fondoPantalla2");
  }
}

function extraerCadena(fecha) {
  return fecha.substr(0, 10);
}

function enviarMail() {
  Swal.fire({
    title: "Se ha Enviado el Mail Exitosamente!!!!",
    icon: "info",
    timer: "2000",
    showConfirmButton: false,
  });
}

function cargarFecha() {
  $("#datepickerInicio").datepicker({
    minDate: new Date(Date.now()),
    showClose: true,
    allowInputToggle: true,
    keepInvalid: true,
    ignoreReadonly: true,

    closeText: "Cerrar",
    prevText: "< Ant",
    nextText: "Sig >",
    currentText: "Hoy",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    weekHeader: "Sm",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    widgetPositioning: {
      horizontal: "auto",
      vertical: "top",
    },
  });


  $("#datepickerFin").datepicker({
    minDate: new Date(Date.now()),
    showClose: true,
    allowInputToggle: true,
    keepInvalid: true,
    ignoreReadonly: true,

    closeText: "Cerrar",
    prevText: "< Ant",
    nextText: "Sig >",
    currentText: "Hoy",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    weekHeader: "Sm",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    widgetPositioning: {
      horizontal: "auto",
      vertical: "top",
    },
  });


}


function asignarPrecioAlquiler(){

  auto=$("#autos option:selected").val();

  console.log(auto)

  switch (auto) {
    case "seleccione":
      $("#importe").val("Valor de la reserva");
      break;
    case "Up":
      $("#importe").val("$ 15000");
      break;

    case "Sandero":
      $("#importe").val("$ 20000");
      break;

    case "Sandero":
      $("#importe").val("$ 23000");
      break;

    case "Prisma":
      $("#importe").val("$ 22500");
      break;

    case "Etios":
      $("#importe").val("$ 23500");
      break;

    case "Corolla":
      $("#importe").val("$ 33500");
      break;

    case "Tracker":
      $("#importe").val("$ 45500");
      break;

    case "Cruze":
      $("#importe").val("$ 45800");
      break;

  }


}
