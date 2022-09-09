# ProyectoFinal-JS

Simulador de reserva de Hotel con servicio al cuarto "online".

PÁGINA PRINCIPAL
En el index.html se encuentra la visual introductoria donde figura la fachada del hotel, se puede 
realizar una reserva la cual se resuelve con una alerta para indicarle como proseguir con el pago.
El formulario tiene validación de datos requeridas por lo que no realiza la accion de reserva si este 
se encuentra vacío en alguno de sus campos.

LOGIN
Al accionar "Soy huesped" en el navegador se redirge a login.html el cual es requerido para acceder
al menu de servicio al cuarto online.
Implementado en un SWAL, su nivel de seguridad es nulo su objetivo es la simulación de acceso a los 
servicios al cuarto "online" en lo que sería un INTRANET del hotel modernizando el servicio.
Estos datos de acceso serían proporcionados por el hotel a registrar el check in del huesped.
El login tiene validacion de datos propias por campos vacíos o por datos de ingreso incorrectos,
los datos de acceso estan indicados en el placeholder de los mismos.
El logueo exitoso redirige mediante una funcion JS a la pagina objetivo la cual solo se puede acceder
con un login satisfactorio.

SERVICIO AL CUARTO
En esta página se desarrollan las condiciones relevantes para la corrección del proyecto como tal.
Luego del acceso permitido por el login, mediante la función window.onload lo primero que se solicita
al servidor local (json) son los datos de los servicios a mostrar con una función asíncrona "fetch".
Al mismo tiempo que se activa la funcion que verifica si el usuario tiene un pedido (carrito) pendiente,
si este esta vacío se ejecuta un mensaje de bienvenida, de estar pendiente se ejecuta un mensaje condicional
que invita a retomar su último estado o a vaciar el mismo antes de proseguir.
Se ejecuta la función que renderiza visualmente los articulos cargados en el archivo json permitiendo la 
futura escalabilidad del proyecto.
Esta llama a la función que carga los items seleccionados al pedido del usuario, los cuales activan dos funciones 
una automatica, que consiste en llevar la contabilidad del consumo y otra opcional que es la de quitar
el item del pedido, consecuentemente modificando la contabilidad y la renderizacion visual del "carrito".
La función que verifica el estado del carrito es la que se encarga de buscar en localStorage si hay una petición pendiente,
el usuario puede vaciar manualmente el carrito quitando uno por uno los elementos o si elige la opción de no retomar el "carrito" 
pendiente cuando reingresó a la página.
Como resolución al carrito mediante el boton "comprar" se ejecuta una alerta que indica que el pedido fue realizado con exito, 
se emplea setTimeout para simular una breve espera y para realizar un refresh amistoso con la visual del usuario.  
