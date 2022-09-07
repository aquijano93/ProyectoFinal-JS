// array donde se cargan los items agregados al carrito.
let carrito = JSON.parse(localStorage.getItem("pedido"))||[];

//array que recibe el json de apilocal en formato JS
let itemsJSON = [];

//captura de elemento para crear el listado de servicios a mostrar.
let listado;

//captura de elemento carrito.
const contenedorCarrito = document.getElementById("listaItems");

//captura de cuerpo del carrito.
const footerCarrito = document.getElementById("tableFooter");

//verficar carrito pendiente o vacio.
const carritoAlmacenado = JSON.parse(localStorage.getItem("pedido"));

window.onload=()=>{
    listado = document.getElementById("lista");
    miApiAJSON();
    estadoCarrito();
}

//función molde para crear formato cartas.
function mostrarServicios() {
    //console.log(itemsJSON) //prueba.
    for (const item of itemsJSON){
        listado.innerHTML+= (`
        <li class="col-3 list-group-item mx-1  mt-3" id="itemCard">
        <h3> <strong>Categoria:</strong> ${item.categoria} </h3>
        <img src=${item.foto} class="card-img rounded-4" >
        <p> Producto: ${item.nombre}</p>
        <p> ${item.descripcion}</p>
        <p><strong> Precio USD ${item.precio}</strong></p>
        <button class="btn btn-danger btn-sm mx-auto" id="btn${item.id}">Agregar</button>
        </li>
        `);
    }
    
    //evento busqueda de botón con id dinámico.
    itemsJSON.forEach(item => {
        //evento agregar al carrito llamando a la duncion listarItem.
        document.getElementById(`btn${item.id}`).addEventListener("click",function(){
            listarItem(item);
        });
    });
}


//funcion para agregar servicios al carrito.
function listarItem (item) {
    //se pushea el item seleccionado por id dinámica.
    carrito.push (item);
    //convierte carrito a JSON.
    const carritoAJson = JSON.stringify(carrito);
    //se guarda carrito formato JSON en local storage.
    localStorage.setItem("pedido", carritoAJson);
    //avisar por swal que se agrego un elemento al carrito.
    swal.fire("Excelente!", `"Agregaste ${item.nombre} a tu pedido."`, "success");
    //se crea el contador del carrito.
    contenedorCarrito.innerHTML ="";
        carrito.forEach(
            (item) => {
            contenedorCarrito.innerHTML += (`    
            <tr id="fila${item.id}" scope="row" colspan="5">
                <td>${item.id}</td>
                <td>${item.categoria}</td>
                <td>${item.nombre}</td>
                <td>USD ${item.precio}</td>
                <td><button class="btn btn-danger btn-sm mx-auto" onclick="quitar(${item.id})">Quitar</button></td>
            </tr>
            <br>
            `);
        }
    );
    //bloque de codigo ternario que modifica el modal carrito si deja de estar vacío.
    carritoAlmacenado == "" ? footerCarrito.innerHTML = (`<th scope="row" colspan="6">Aún no solicitó ningun servicio.</th>`): footerCarrito.innerHTML = (`<tr><th>Total USD</th><td>${(calcularTotal())}</td></tr>`);
}   

//funcion para quitar objetos de el pedido.
function quitar (id) {
    let posicion = carrito.findIndex(item => item.id==id);
    carrito.splice(posicion,1);
    let filaAQuitar = document.getElementById(`fila${id}`);
    contenedorCarrito.removeChild(filaAQuitar);
    carritoAlmacenado == "" ? footerCarrito.innerHTML = (`<th scope="row" colspan="6">Aún no solicitó ningun servicio.</th>`): footerCarrito.innerHTML = (`<tr><th>Total USD</th><td>${calcularTotal()}</td></tr>`);
    //convierte carrito a JSON.
    let carritoAJson = JSON.stringify(carrito);
    //se guarda carrito formato JSON en local storage.
    localStorage.setItem("pedido", carritoAJson);
    Swal.fire("Servicio removido!")
    
}


//funcion para imprimir el carrito "abandonado".
function estadoCarrito () {
    //costumizaciones de boton de swal a BS por mixin.
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    if(carritoAlmacenado){
        //alerta que indica el carrito abandonado.
        swal.fire({
            title: "Estado del carrito.",
            text: "Tienes un carrito pendiente, deseas retomarlo?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtontext: "No",
            reverseButtons: true
        })
        //condicional que vacia el carrito por decision del usuario.
        .then((borrar) => {
            if (borrar.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    "Listo!",
                    "Tu carrito está como lo dejaste.",
                    "success"
                    )
                } else {
                    //se borra los datos del carrito del local storage.
                    localStorage.clear();
                    //se refresca la pagina para la visualizacion mediante interacciòn del usuario.
                    location.reload()
                    swalWithBootstrapButtons.fire(
                        "Listo!",
                        "Hemos vaciado tu carrito!",
                        "error"
                        )
                    }
            });
            //bloque de codigo que trae el carrito del storage y lo dibuja en el carrito abandonado.
        carritoAlmacenado.forEach(
        (item) => {
            contenedorCarrito.innerHTML += (`
            <tr id="fila${item.id}" scope="row" colspan="5">
            <td>${item.id}</td>
            <td>${item.categoria}</td>
            <td>${item.nombre}</td>
            <td>USD ${item.precio}</td>
            <td><button class="btn btn-danger btn-sm mx-auto" onclick="quitar(${item.id})">Quitar</button></td>
            </tr>
            <br>
            `);
        });
        //bloque de codigo ternario que modifica el modal carrito si deja de estar vacío.
        carritoAlmacenado == "" ? footerCarrito.innerHTML = (`<th scope="row" colspan="6">Aún no solicitó ningun servicio.</th>`): footerCarrito.innerHTML = (`<tr><th>Total USD</th><td>${(calcularTotal())}</td></tr>`);
                
    }
}

function calcularTotal() {
    let suma = 0;
    for (const item of (carrito)) {
        suma += item.precio;
    }
    return suma;
}

//obtener api local
async function miApiAJSON () {
    const URLJSON ="apiLocal.json";
    const respuesta = await fetch(URLJSON);
    const datos = await respuesta.json()
    itemsJSON = datos;
    mostrarServicios();
}
console.log(itemsJSON);
//console.log(carrito);