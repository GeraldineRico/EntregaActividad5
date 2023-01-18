var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//crud
var datos = [];

//create
app.post("/cliente/guardar", function (request, response) {

    var informacion = {
        cedula: request.body.identification,
        nombre: request.body.name,
        apellido: request.body.lastName,
        direccion: request.body.adress,
        telefono: request.body.phone,
        edad: request.body.age,
        estadoCivil: request.body.status
    }

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (informacion.cedula == "" || informacion.cedula == null || informacion.cedula == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (informacion.cedula.length < 5) {
        response.json({ state: false, mensaje: "Debe ser mayor de 5 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (informacion.cedula.length > 10) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (informacion.nombre == "" || informacion.nombre == null || informacion.nombre == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (informacion.nombre.length < 3) {
        response.json({ state: false, mensaje: "Debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (informacion.nombre.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato apellido no este vacio, nulo o indefinido
    if (informacion.apellido == "" || informacion.apellido == null || informacion.apellido == undefined) {
        response.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (informacion.apellido.length < 3) {
        response.json({ state: false, mensaje: "Debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (informacion.apellido.length > 20) {
        response.json({ state: false, mensaje: "El campo apellido no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato direccion no este vacio, nulo o indefinido
    if (informacion.direccion == "" || informacion.direccion == null || informacion.direccion == undefined) {
        response.json({ state: false, mensaje: "El campo dirección es obligatorio" })
        return false
    }

    //para validar que el dato telefono no este vacio, nulo o indefinido
    if (informacion.telefono == "" || informacion.telefono == null || informacion.telefono == undefined) {
        response.json({ state: false, mensaje: "El campo telefono es obligatorio" })
        return false
    }

    
    //para validar que el dato edad no este vacio, nulo o indefinido
    if (informacion.edad == "" || informacion.edad == null || informacion.edad == undefined) {
        response.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (informacion.edad < 18) {
        response.json({ state: false, mensaje: "Debe ser mayor de edad" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (informacion.edad > 100) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 100" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (informacion.estadoCivil == "" || informacion.estadoCivil == null || informacion.estadoCivil == undefined) {
        response.json({ state: false, mensaje: "El campo estadoCivil es obligatorio" })
        return false
    }

    datos.push(
        {
            cedula: request.body.identification,
            nombre: request.body.name,
            apellido: request.body.lastName,
            direccion: request.body.adress,
            telefono: request.body.phone,
            edad: request.body.age,
            estadoCivil: request.body.status
        })

    response.json({ state: true, mensaje: "Usuario guardado" })
})

//read
app.post("/cliente/listarClientes", function (request, response) {
    response.json({ state: true, dato: datos })
})

//update "se requiere un campo único como la cédula"
app.post("/cliente/actualizar", function (request, response) {
    var actualizar = {
        cedula: request.body.identification,
        nombre: request.body.name,
        apellido: request.body.lastName,
        direccion: request.body.adress,
        telefono: request.body.phone,
        edad: request.body.age,
        estadoCivil: request.body.status
    }

    if (actualizar.cedula == "" || actualizar.cedula == undefined || actualizar.cedula == null) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    if (actualizar.edad == "" || actualizar.edad == undefined || actualizar.edad == null) {
        response.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (actualizar.edad < 18) {
        response.json({ state: false, mensaje: "Debe ser mayor de edad" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (actualizar.edad > 100) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 100" })
        return false
    }

    var posicion = datos.findIndex((item) => item.cedula == actualizar.cedula)

    if (posicion == -1) {
        response.json({ state: false, mensaje: "La cédula no existe" })
        return false
    }

    datos[posicion].edad = actualizar.edad
    datos[posicion].nombre = actualizar.nombre
    datos[posicion].apellido = actualizar.apellido
    datos[posicion].direccion = actualizar.direccion
    datos[posicion].telefono = actualizar.telefono
    datos[posicion].edad = actualizar.edad
    datos[posicion].estadoCivil = actualizar.estadoCivil

    response.json({ state: true, mensaje: "Se actualizaron los datos correctamente" })

})

//delete
app.post("/cliente/borrar", function (request, response) {
    var borrar = {
        cedula: request.body.identification,
    }

    if (borrar.cedula == "" || borrar.cedula == undefined || borrar.cedula == null) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    //splice para borrar del array, de la posición encontrada y el numero de elementos que se quiere borrar
    var posicion = datos.findIndex((item) => item.cedula == borrar.cedula)

    if (posicion == -1) {
        response.json({ state: false, mensaje: "La cédula no existe" })
        return false
    }

    datos.splice(posicion, 1)
    response.json({ state: true, mensaje: "Se eliminó correctamente" })
})

app.listen(3000, function () {
    console.log('servidor funcionando por el puerto ' + 3000)
})
