
baseDeDatos = localStorage.getItem("sistemaIngreso");


if (!baseDeDatos) {
    cargarDatosIngreso();
}

function guardarDatosIngreso () {
    localStorage.setItem("sistemaIngreso", JSON.stringify(baseDeDatos));
}

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
    let {value : datos} = await swal.fire({
        title : "Bienvenido",
        confirmButtonText: "Ingresar",
        html:`
        <div style="margin:5px">
            <input class="swal2-input" placeholder="Habitación (117)" id="habitacion">
            <input type="password" class="swal2-input" placeholder="Contraseña (invitado)" id="contrasenia">
        </div>
        `,
    preConfirm: () => {
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

