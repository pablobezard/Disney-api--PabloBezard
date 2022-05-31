const { Router} = require("express");
const req = require("express/lib/request");
const router = Router();
const _= require("underscore")

const characters = require('../data.json')




//desde consola poner npm run dev para verificar el puerto
//get  /api/characters
router.get('/', (req, res) => {
    res.json(characters);
});




//post agregar personaje
// no es necesario colocar un id lo hace automaticamente 
router.post('/', (req, res) =>{

    const { name,image, age, description, movies}= req.body;
    if(name && image && age && description && movies){
        const id = characters.length + 1;
        const newCharacter = {...req.body, id}
        characters.push(newCharacter)
        res.json(characters)
    } else {
        res.status(500).json({ error: 'wrong request'})
    }
});

//updates
router.put('/:id', (req, res) => {
    
const {id} = req.params;
const { name, image, age, description, movies } = req.body;
if (  name && image && age && description && movies){
    _.each(characters, (character, i) => {
        if(character.id == id){

        character.name = name;
        character.image = image;
        character.age = age;
        character.description = description;
        character.movies = movies;
    

        }
        //lo que muestra postman
        res.json(characters)
    }) 

    //error
}else {
    res.status(500).json({error: 'todos los campos son requeridos'})
}

});



//delete
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    _.each(characters, (character, i) =>{
        if (character.id == id){
            characters.splice(i, 1);
        }
    })
    res.send(characters)
})

module.exports = router;