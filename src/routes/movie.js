const { Router} = require("express");
const req = require("express/lib/request");
const router = Router();
const _= require("underscore")

const movies= require('../movies.json')





//desde consola poner npm run dev para verificar el puerto
//get  /api/characters
router.get('/', (req, res) => {
    res.json(movies);
});
// get filtros 
router.get('/name=nombre', (req, res) => {
    const {nameM} = req.body;
    if(nameM){
    const newMovie = {...req.body}
    movies.push(newMovie)
    res.json(movies)}
});






//post agregar movies
// no es necesario colocar un id, lo hace automaticamente 
router.post('/', (req, res) => {
        const {nameM, imageM, createDate, gender, characters} = req.body;
        if (nameM && imageM && createDate && gender && characters){
            const id = movies.length + 1;
            const newMovie = {...req.body, id}
            movies.push(newMovie)
            res.json(movies)
        }else{
        res.status(500).json({error: "there was an error"})
    }
        
    
});

//updates actualizar datos
router.put('/:id', (req, res) => {
    
const {id} = req.params;
const { nameM, imageM, createDate, gender, characters } = req.body;
if ( nameM && imageM && createDate && gender && characters){
    _.each(movies, (movie, i)=>{
        if (movie.id == id){
        movie.nameM = nameM;
        movie.imageM = imageM;
        movie.createDate = createDate;
        movie.gender = gender;
        movie.characters = characters;
    }

    })
    res.json(movies)

    //error
}else {
    res.status(500).json({error: 'todos los campos son requeridos'})
}

});



//delete - volver hacer un get para ver la pelicula eliminada
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    _.each(movies, (movie, i) => {
        if(movie?.id == id){
            movies.splice(i, 1)
        }
    })

    res.send(movies)
})

module.exports = router;