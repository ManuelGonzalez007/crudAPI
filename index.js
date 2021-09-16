let personajes = [
    { id: 1, nombre: "Jon", apellido: "Snow" },
    { id: 2, nombre: "Tyrion ", apellido: "Lannister" },
    { id: 3, nombre: "Daenerys", apellido: "Targaryen" },
    { id: 4, nombre: "Khal", apellido: "Drogo" },
    { id: 5, nombre: "Robb", apellido: "Stark" }
]

const { response } = require("express");
const express = require("express");
const fs = require('fs')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("assets"));
app.use(express.json()) 


app.get("/", (req, res) => {

    res.redirect("/user");
})

app.get("/user", (req, res) => {
    let usuarios = "";
    for (let i = 0; i < personajes.length; i++) {
        usuarios += `${personajes[i].id} ${personajes[i].nombre} ${personajes[i].apellido} <br>`

    }  
  
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('characters.html').pipe(res)
    res.write(`<span style="color:white;font-size:30px;font-family:monospace">${usuarios}<span>`)
   


})

app.get("/user/:id", (req, res) => {
    let numeroId = parseInt(req.params.id)

    for (let i = 0; i < personajes.length; i++) {
        if (personajes[i].id === numeroId) {
            res.writeHead(200, { 'content-type': 'text/html' })
            fs.createReadStream('character.html').pipe(res)
           return res.write(`<span style="color:white;font-size:30px;font-family:monospace">${personajes[i].id} ${personajes[i].nombre} ${personajes[i].apellido}<span>`)
        
        }
        
    }
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('character.html').pipe(res)
    return  res.write(`<span style="color:white;font-size:30px;font-family:monospace">Personaje no encontrado<span>`)
    


})


app.post("/user", (req, res) => {  
    // ((/[a-zA-Z]/).test(req.body.nombre)) chequea que el string tenga al menos una letra   
    if (req.body.nombre && req.body.apellido && (/[a-zA-Z]/).test(req.body.nombre)
        && (/[a-zA-Z]/).test(req.body.apellido) && typeof (req.body.nombre) === "string" && typeof (req.body.apellido) === "string") {
        for (let i = 0; i < personajes.length; i++) {

            personajes[i].nombre = personajes[i].nombre.toLowerCase()
            personajes[i].apellido = personajes[i].apellido.toLowerCase()

            personajes[i].nombre = personajes[i].nombre.charAt(0).toUpperCase() +  personajes[i].nombre.slice(1)
            personajes[i].apellido = personajes[i].apellido.charAt(0).toUpperCase() + personajes[i].apellido.slice(1)
            
            req.body.nombre = req.body.nombre.toLowerCase()
            req.body.apellido = req.body.apellido.toLowerCase()
            
            req.body.nombre = req.body.nombre.charAt(0).toUpperCase() +  req.body.nombre.slice(1)
            req.body.apellido = req.body.apellido.charAt(0).toUpperCase() +  req.body.apellido.slice(1)


            if (personajes[i].nombre === req.body.nombre && personajes[i].apellido === req.body.apellido) {
                return res.send("El personaje ya existe")  

            }         



        }   

  

        personajes.push(req.body) 
        personajes[personajes.length - 1].id = personajes.length
        res.send("Personaje agregado")
    } else {
        res.send("Error al ingresar los datos")
    }

})

app.patch("/user/:id", (req, res) => {
    let numeroId = parseInt(req.params.id)
    for (let i = 0; i < personajes.length; i++) {
        if (personajes[i].id === numeroId) {
            if (req.body.nombre === "" || req.body.apellido === "") {
                return res.send("Error al ingresar los datos")
            }

            if (req.body.nombre) {
                personajes[i].nombre = req.body.nombre
                personajes[i].nombre = personajes[i].nombre.toLowerCase()
                personajes[i].nombre = personajes[i].nombre.charAt(0).toUpperCase() +  personajes[i].nombre.slice(1)

        
            }
            if (req.body.apellido) {
                personajes[i].apellido = req.body.apellido
                personajes[i].apellido = personajes[i].apellido.toLowerCase()
                personajes[i].apellido = personajes[i].apellido.charAt(0).toUpperCase() + personajes[i].apellido.slice(1)



            }



            return res.send(`Personaje modificado: ${personajes[i].nombre} ${personajes[i].apellido}`)


        }

    }
    res.send("Personaje no encontrado")

})

app.delete("/user/:id", (req, res) => {
    let numeroId = parseInt(req.params.id)
    for (let i = 0; i < personajes.length; i++) {
        if (personajes[i].id === numeroId) {
            let usuarioEliminado = `${personajes[i].id} ${personajes[i].nombre} ${personajes[i].apellido}`
            personajes.splice(i, 1)
            res.send(`${usuarioEliminado} eliminado`)

            return;
        }
    }
    res.send("Personaje no encontrado")
})

app.get('*', (req, res) => {

    res.writeHead(404, { 'content-type': 'text/html' })
    fs.createReadStream('assets/404.html').pipe(res)

})

app.listen(port, () => {
    console.log("Server is running...")
})
