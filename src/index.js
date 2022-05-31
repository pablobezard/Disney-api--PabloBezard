const express = require('express');
const app = express();
const pasport = require ('passport')
const morgan = require('morgan');

app.set('view engine', 'ejs');

//settings
app.set('port', process.env.PORT || 3000);


//middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// routes
app.use('/api/characters',require('./routes/character')); 
app.use('/api/movies',require('./routes/movie')); 
app.use('/api/users', require('./routes/users'))

//starting server the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

//login
app.get('/', (req, res) =>{
    // si iniciamos mostrar bienvenida

    // si no hemos iniciado sesion redirecciona a login
});

app.get('/login', (req, res) =>{
    // mostrar el formulario de login
    res.render("login")
});

app.post('/', (req, res) =>{
    //recibir credenciales e iniciar secion
});
