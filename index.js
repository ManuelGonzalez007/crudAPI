
let personas = [
                {id: 1, nombre:"Jon", apellido:"Snow"},
                {id: 2, nombre:"Tyrion ", apellido:"Lannister"}

               ] 



const express = require("express");
const app = express();

app.use(express.json())


app.get("/user", (req,res) => {
    let usuarios = "";
    for(let i = 0; i < personas.length; i++) {
       usuarios += `${personas[i].id} ${personas[i].nombre} ${personas[i].apellido} <br>`
                 
    }
    res.send(usuarios)   
})


app.get("/user/:id", (req,res) => {    
    let numeroId = parseInt(req.params.id)
    for(let i = 0; i < personas.length; i++) {     
        if(personas[i].id === numeroId) { // el id del elemento actual es igual al que me pasaron
           return res.send(`${personas[i].id} ${personas[i].nombre} ${personas[i].apellido}`)                   
        }        
        
    }
   
        res.send("Usuario no encontrado")    

})


app.post("/user", (req,res) => {
    // ((/[a-zA-Z]/).test(req.body.nombre)) chequea que el string tenga al menos una letra
    if(req.body.id && req.body.nombre && req.body.apellido && (/[a-zA-Z]/).test(req.body.nombre) 
        && (/[a-zA-Z]/).test(req.body.apellido) && Number.isInteger(req.body.id) 
        && typeof(req.body.nombre) === "string" && typeof(req.body.apellido) === "string") {
        for(let i = 0; i < personas.length; i++) {
            if(personas[i].id === req.body.id) {
              return res.send("El usuario ya existe")  
              
            }          
           
        }
        personas.push(req.body)
        res.send("Usuario agregado")
    } else {
        res.send("Error al ingresar los datos")
    }
   
})

app.patch("/user/:id", (req,res) => {
    let numeroId = parseInt(req.params.id)
    for(let i = 0; i < personas.length; i++) {
        if(personas[i].id === numeroId) {
            if(req.body.nombre === "" || req.body.apellido === "") {
                return res.send("Error al ingresar los datos")
            }

            if(req.body.nombre) {
                personas[i].nombre = req.body.nombre                
            } 
            if(req.body.apellido) {               
                personas[i].apellido = req.body.apellido               

            }

            

            return res.send(`Usuario modificado: ${personas[i].nombre} ${personas[i].apellido}`)
           

        }

    }
    res.send("Usuario no encontrado")
    
})

app.delete("/user/:id", (req,res) => {
    let numeroId = parseInt(req.params.id)
    for(let i = 0; i < personas.length; i++) {        
        if(personas[i].id === numeroId) {
            let usuarioEliminado = `${personas[i].id} ${personas[i].nombre} ${personas[i].apellido}`
            personas.splice(i, 1)                      
            res.send(`Usuario ${usuarioEliminado} eliminado`)
          
            return;                 
        }        
    }
    res.send("Usuario no encontrado")
})

app.listen(5000, ()=> {
    console.log("Server on port 5000")
})
