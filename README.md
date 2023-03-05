# crudAPI 
Es una aplicacion CRUD creada a partir de Node.js y Express.js.

Permite acceder y modificar una base de datos ficticia, simulada a traves de un array, de personajes de Game of Thrones

Pueden verla funcionando en el siguiente link: https://crud-got-api.onrender.com/user

A traves del navegador, podes acceder a la lista de personajes: https://crud-got-api.onrender.com/user 

Además podemos agregar el correspondiente id para ver solo un elemento de la lista: https://crudapi01.herokuapp.com/user/1

Utilizando Postman podemos llamar al metodo POST para agregar personajes, PATCH para editar y DELETE para quitar algún elemento.

Ejemplo de POST:

**Method**: POST,
**URL**: https://crudapi01.herokuapp.com/user,
**BODY**: 
{
    "nombre": "Ned",
    "apellido": "Stark"
}

Ejemplo de PATCH:

**Method**: PATCH,
**URL**: https://crudapi01.herokuapp.com/user/6,
**BODY**: 
{
    "nombre": "Eddard"
}

Ejemplo de DELETE:

**Method**: DELETE,
**URL**: https://crudapi01.herokuapp.com/user/6



### Instrucciones para correrlo localmente:

1. Instalar node: https://nodejs.org/en/

2. Clonar el repositorio de GitHub: *git clone https://github.com/ManuelGonzalez007/crudAPI.git*

3. Instalar dependencias: *npm install*

4. Levantar el servidor: *npm run dev*

5. App disponible en: *localhost:3000*

