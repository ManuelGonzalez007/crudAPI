let personajes = [
    { id: 1, nombre: "Jon", apellido: "Snow" },  
    { id: 2, nombre: "Tyrion ", apellido: "Lannister" },
    { id: 3, nombre: "Daenerys", apellido: "Targaryen" },
    { id: 4, nombre: "Khal", apellido: "Drogo" },
    { id: 5, nombre: "Robb", apellido: "Stark" } 
]

const express = require("express");
const fs = require('fs')
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs' 
}));

app.set('view engine', 'hbs');

app.use(express.static("assets"));
app.use(express.json()) 


app.get("/", (req, res) => {

    res.redirect("/user");
})

app.get("/user", (req, res) => {
    let usuarios = [];
    for (let i = 0; i < personajes.length; i++) {
        usuarios.push(`${personajes[i].nombre} ${personajes[i].apellido}`)        
    }  
    res.render('home', {usuarios: usuarios});
})

app.get("/user/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.render('home2', {layout: 'main2.hbs', usuario: ["Bad request"]})
        return
    }
    let numeroId = parseInt(req.params.id)

    for (let i = 0; i < personajes.length; i++) {
        if (personajes[i].id === numeroId) {
            res.render('home', {usuarios:[`${personajes[i].nombre} ${personajes[i].apellido}`]});
           return 
        }
        
    }
    
    res.render('home', {usuarios: ["Personaje no encontrado"]});
})


app.post("/user", (req, res) => {  
    // ((/[a-zA-Z]/).test(req.body.nombre)) chequea que el string tenga al menos una letra   
    if (req.body.nombre && req.body.apellido && (/[a-zA-Z]/).test(req.body.nombre)
        && (/[a-zA-Z]/).test(req.body.apellido) && typeof (req.body.nombre) === "string" && 
        typeof (req.body.apellido) === "string") {
        for (let i = 0; i < personajes.length; i++) {
            
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
            if (isNaN(req.params.id) || req.body.nombre === "" || req.body.apellido === "") {
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
    let eliminado = false;
    let usuarioEliminado = "";
    let numeroDeUsuarioEliminado = 0; 
    if(isNaN(req.params.id)) {
        res.send("Error al ingresar los datos")
        return 
    }
    for (let i = 0; i < personajes.length; i++) {        
        if (personajes[i].id === numeroId) {
            eliminado = true;
            usuarioEliminado = `${personajes[i].id} ${personajes[i].nombre} ${personajes[i].apellido}`
            personajes.splice(i, 1)     
            break;  
        } 
        numeroDeUsuarioEliminado++; 
    } 

    if(eliminado) { 
        for(let i = numeroDeUsuarioEliminado; i < personajes.length; i++) {
            personajes[i].id =  personajes[i].id - 1
        }

        res.send(`${usuarioEliminado} eliminado`)  

    } 

    if(!eliminado) {
        res.send("Personaje no encontrado") 
    }
 
})

app.get('*', (req, res) => {
    res.render('home2', {layout: 'main2.hbs', usuario: ["Page Not Found"]})
})

app.listen(port, () => {
    console.log("Server is running...")
})