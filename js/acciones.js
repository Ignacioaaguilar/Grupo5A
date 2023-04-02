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
      generarPDF();
    }
  });

 
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


  $("#loginform").validate({
    rules:{
      nombreApellido:{
        required:true
      },
      email:{
        required:true,
        email: true
      },
      telefono:{
        required:true,
        minlength: 2, maxlength: 11
       
       
      },
      asunto:{
        required:true
      },
      mensaje: { required:true, minlength: 2},
    },
    messages:{
      nombreApellido:{
        required:"Debe ingresar el Nombre y Apellido"
      },
      email:{
        required:"Debe ingresar el Mail"
      },
      telefono : "El campo Teléfono no contiene un formato correcto.",

      asunto:{
        required:"Debe ingresar el Asunto"
      },
      mensaje : "El campo Mensaje es obligatorio",
    },
    submitHandler: function(form){
      enviarMail();
      $("#nombreApellido").val("");
      $("#email").val("");
      $("#telefono").val("");
      $("#asunto").val("");
      $("#mensaje").val("");
      
  }
 

  })


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

function generarResumen(){

 
  if ((arrCuenta.length>0)||(arrpersonales.length>0)){
    $("#modalResumen").modal("show");

    if (arrCuenta.length>0){
        cuenta=`<form>
                  <h5 class="text-info">Datos de la Cuenta</h5>
                  <div class="row ml-3">
                  
                    <div class="col">
                      <address>
                        <small><strong>Email: </strong></small> ${arrCuenta[0].email}                    
                      </address>                  
                    </div>
                    <div class="col">
                      <address>
                        <small><strong>Usuario: </strong></small>${arrCuenta[0].usuario}
                        
                      </address>
                      
                    </div>
                  </div>
                </form>
                <hr>`;

        $("#cuenta").html(cuenta);
    }

    if (arrpersonales.length>0){
        reserva=`<form>
                    <h5 class="text-info">Datos de la Reserva</h5>
                    <div class="row ml-3">                
                      <div class="col-md-6">
                        <address>
                          <small><strong>Nombre: </strong></small> ${arrpersonales[0].fname}                    
                        </address>                  
                      </div>
                      <div class="col-md-6">
                        <address>
                          <small><strong>Apellido: </strong></small>${arrpersonales[0].lname}                      
                        </address>                    
                      </div>

                      <div class="col-md-6">
                        <address>
                          <small><strong>Telefono: </strong></small> ${arrpersonales[0].tel}                    
                        </address>                  
                      </div>
                      <div class="col-md-6">
                        <address>
                          <small><strong>Cel: </strong></small>${arrpersonales[0].cel}                      
                        </address>                    
                      </div>

                      <div class="col-md-6">
                        <address>
                          <small><strong>Auto: </strong></small> ${arrpersonales[0].auto}                    
                        </address>                  
                      </div>
                      <div class="col-md-6">
                        <address>
                          <small><strong>Precio Alquiler: </strong></small>${arrpersonales[0].importePago}                      
                        </address>                    
                      </div>

                      <div class="col-md-6">
                        <address>
                          <small><strong>Fecha Inicio: </strong></small> ${arrpersonales[0].fechaInicio}                    
                        </address>                  
                      </div>
                      <div class="col-md-6">
                        <address>
                          <small><strong>Fecha Fin: </strong></small>${arrpersonales[0].fechaFin}                      
                        </address>                    
                      </div>
                    </div>
                  </form>
                  <hr>`;
        $("#reserva").html(reserva);

    }


    if (arrpagos.length>0){
            pago=`<form>
                    <h5 class="text-info">Informacion del Pago</h5>
                    <div class="row ml-3">                
                      <div class="col-md-6">
                        <address>
                          <small><strong>Titular Tarjeta: </strong></small> ${arrpagos[0].titularTarjeta}                    
                        </address>                  
                      </div>`;

                      if (arrpagos[0].tarjCredito==true){
                        pago +=`<div class="col-md-6">
                                  <address>
                                    <small><strong>Medio Pago: </strong></small>${"Tarjeta Credito"}                      
                                  </address>                    
                                </div>`;

                      }

                      if (arrpagos[0].tarjDebito==true){
                        pago +=`<div class="col-md-6">
                                  <address>
                                    <small><strong>Medio Pago: </strong></small>${"Tarjeta Debito"}                      
                                  </address>                    
                                </div>`;

                      }              
                      

                      pago +=` <div class="col-md-12">
                            <address>
                              <small><strong>Numero Tarjeta </strong></small> ${arrpagos[0].numeroTarjeta}                    
                            </address>                  
                          </div>             

                      
                    </div>
                  </form>
                  <hr>`;

          $("#pago").html(pago);

    }



  }else{
    Swal.fire({
      title: "No hay datos para generar el resumen",
      icon: "warning",
      timer: "2000",
      showConfirmButton: false,
    });

  }

  
}


function generarPDF(){

  if ((arrCuenta.length>0)&&(arrpersonales.length>0)&&(arrpagos.length>0)){
        let email=arrCuenta[0].email;
        let usuario=arrCuenta[0].usuario;

        let nombre=arrpersonales[0].fname;
        let apellido=arrpersonales[0].lname;
        let telefono=arrpersonales[0].tel;
        let cel=arrpersonales[0].cel;
        let auto=arrpersonales[0].auto;  
        let alquiler=arrpersonales[0].importePago;
        let fechaFin=arrpersonales[0].fechaFin;
        let fechaInicio=arrpersonales[0].fechaInicio;


        let titularTarjeta=arrpagos[0].titularTarjeta;
        let medioPagoDebito=arrpagos[0].tarjDebito;
        let medioPagocredito=arrpagos[0].tarjCredito;
        let mediopago="";

        

        if (medioPagoDebito==true){
          mediopago="Tarjeta Debito"
        }
        if (medioPagocredito==true){
          mediopago="Tarjeta Credito"
        }

        let numeroTarjeta=arrpagos[0].numeroTarjeta;


        
        var doc = new jsPDF();
      
        //RESUMEN DE LA RESERVA
        doc.setFontSize(20);    
        doc.text(`Resumen de la reserva`, 70, 20, { align: 'center'} );


        //DATOS DE LA CUENTA
        doc.setFontSize(18);
        doc.setTextColor(13, 198, 231);
        doc.text(20, 40, 'Datos de la cuenta');
        
        //EMAIL
        doc.setTextColor(0, 0, 0);
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 50, 'Email:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(48, 50, email);

        //USUARIO
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(120, 50, 'Usuario:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(142, 50, usuario);

        


        //DATOS DE LA RESERVA

        doc.setFontSize(18);
        doc.setTextColor(13, 198, 231);
        doc.text(20, 70, 'Datos de la Reserva');

        //NOMBRE
        doc.setTextColor(0, 0, 0);
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 80, 'Nombre:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(52, 80, nombre); 

        //APELLIDO
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(120, 80, 'Apellido:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(142, 80, apellido);

        //TELEFONO
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 90, 'Telefono:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(53, 90, telefono); 

        //CELULAR
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(120, 90, 'Celular:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(140, 90, cel); 

        //AUTO
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 100, 'Auto:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(44, 100, auto); 

        //PRECIO ALQUILER
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(120, 100, 'Precio Alquiler:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(158, 100, alquiler); 

        //FECHA INICIO
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 110, 'Fecha Inicio:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(63, 110, fechaInicio); 

        //FECHA FIN
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(120, 110, 'Fecha Fin:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(148, 110, fechaFin);




        //DATO PAGO
        doc.setFontSize(18);
        doc.setTextColor(13, 198, 231);
        doc.text(20, 130, 'Informacion del Pago');

        //TITULAR TARJETA
        doc.setTextColor(0, 0, 0);
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 140, 'Titular Tarjeta:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(65, 140, titularTarjeta);
      



        //MEDIO DE PAGO
        doc.setTextColor(0, 0, 0);
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(120, 140, 'Medio Pago:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(150, 140, mediopago);

        //NUMERO TARJETA
        doc.setTextColor(0, 0, 0);
        doc.setFontType('bold');
        doc.setFontSize(14);
        doc.text(30, 150, 'Numero Tarjeta:');
        doc.setFontType('normal');
        doc.setFontSize(12);
        doc.text(70, 150, numeroTarjeta);

        doc.save('PracticoIntegrador5A.pdf');

      }else{
        Swal.fire({
          title: "No hay datos para generar el PDF",
          icon: "warning",
          timer: "2000",
          showConfirmButton: false,
        });
    
      }
  }

