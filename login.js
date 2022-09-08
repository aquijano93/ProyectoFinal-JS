//variable que obtiene los datos de igresos seteados en local storage previamente.
baseDeDatos = localStorage.getItem("sistemaIngreso");

//bloque de codigo que carga los datos iniciales en caso de que local storage estè vacìo.
if (!baseDeDatos) {
    cargarDatosIngreso();
}

//funcion que guarda los datos de ingreso en local storage.
function guardarDatosIngreso () {
    localStorage.setItem("sistemaIngreso", JSON.stringify(baseDeDatos));
}

//funcion que carga los datos de igreso en el mismo JS.
function cargarDatosIngreso () {
    baseDeDatos= {
        117 : {
            contrasenia:"invitado",
        },
        217 : {
            contrasenia: "2pzk4y",
        },
        317: {
            contrasenia: "xy2k5h",
        },
    };
}

//funcion que crea el login mediante Sweet Alert.
async function ingresar (){
    //variable desestructura valores obtenidos y datos que se obtienen de la funcion "preConfirm".
    let {value : datos} = await swal.fire({
        title : "Bienvenido",
        confirmButtonText: "Ingresar",
        html:`
        <div style="margin:5px">
            <input class="swal2-input" placeholder="Habitación (117)" id="habitacion">
            <input type="password" class="swal2-input" placeholder="Contraseña (invitado)" id="contrasenia">
        </div>
        `,
        //bloque de codigo accionado por funcion de SWAL "preConfirm" la cual ejecuta mensajes de validacion para faltantes de campo o datos incorrectos.
    preConfirm: () => {
        //variables que toman los valores de los campos de SWAL para verificación de datos.
        let habitacion = document.getElementById("habitacion").value;
        let contrasenia = document.getElementById("contrasenia").value;
        if (!habitacion) {
            Swal.showValidationMessage("Debe ingresar el nro de habitación.");
            return false;
        }
        if (!contrasenia) {
            Swal.showValidationMessage("Debe ingresar contraseña");
            return false;
        }
        let datos = baseDeDatos[habitacion];
        if(!datos) {
            Swal.showValidationMessage("La habitación no existe.");
            return false;
        }
        if(datos.contrasenia != contrasenia){
            Swal.showValidationMessage("Contraseña incorrecta.");
            return false;
        }else if (datos.contrasenia == contrasenia) {
            window.open("./huesped.html", "_self");
        }
        return datos;
        },
    });
    return datos;
}

