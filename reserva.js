// array al cual se le cargaran los datos reserva.
const reserva = [];

//clase constructora de objeto inscripto mediante datos tomados por el formulario reserva.
class Inscripto {
    constructor (nombre, apellido, documento, direccion, email, telefono, confort) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
        this.confort = confort;
    }
}

//capturar formulario de reserva.
const miFormulario = document.getElementById("formularioReserva");

//formulario reserva.

//captura del evento submit del formulario.
miFormulario.addEventListener( "submit", crearReserva );
//funcion que toma los datos del formulario.
function crearReserva (e){
    //accion que evita el reincio de la pagina por defecto
    e.preventDefault();

    //bloque de codigo que capturan los valores del formulario mediante DOM
    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let documento = parseInt(document.getElementById("inputDocumento").value);
    let direccion = document.getElementById("inputDireccion").value;
    let email = document.getElementById("inputEmail").value;
    let telefono = parseInt(document.getElementById("inputTel").value);
    let confort = document.getElementById("inputConfort").value;
    
    //bloque de codigo que toma los valores anteriores, para crear un nuevo objeto para su posterior push al array 
    let inscripto = new Inscripto (nombre, apellido, documento, direccion, email, telefono, confort);
    reserva.push (inscripto);
    console.log (reserva);//verificacion de funcionalidad en consola
    let reservaJson = JSON.stringify (reserva);
    sessionStorage.setItem ("reserva", reservaJson);
    //bloque de codigo que resuelve la reserva si todos los campor requeridos son completados.
        if (((nombre) && (apellido) && (documento) && (direccion) && (email) && (telefono)) != ""){
            Swal.fire({
                title: "Excelente!",
                text: "Tu reserva fue procesada con exito, te enviaremos un correo con los datos de la reserva y tu recibo virtual para abonar en redes de cobranza o mediante transferencia/depósito bancario.",
                icon: "success"
            });
        }
    // Funcion anonima autoejecutable de validación formulario de BS (extraido del manual de BS).
    (() => {
    'use strict'
    // Query selector para todo el form BS.
    const forms = document.querySelectorAll('.needs-validation')

    // prevenir default BS
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated')
        }, false)
    });
    })()
}

//funcion que resetea el formulario al enviar datos.
document.addEventListener('DOMContentLoaded', function(){
    miFormulario.addEventListener('submit', function() {
        miFormulario.reset();
    });
});

//pruebas
console.log(reserva);