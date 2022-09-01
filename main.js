// array al cual se le cargaran los datos reserva.
const reserva = [];
// array donde se cargan los items agregados al carrito.
const carrito = [];
// array de objetos "servicio al cuarto".

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