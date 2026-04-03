// para iniciar es así: 
// el node --watch ./app.js es para que se reinicie el servidor cada vez que se haga un cambio en el código

const express = require('express');
const movies = require('./movies.json');
const app = express();
const {validateMovie, validatePartialMovie} = require('./schemas/movies') // para validar los datos que se reciben en el body de las peticiones


app.use(express.json()) // para que el servidor pueda entender el formato json en el body de las peticiones
app.get('/', (req,res) => {
    res.json({message: 'Hola mundo'});
});
//si
//todos los recursos que sean movies se identifican con /movies, por ejemplo: /movies/1, /movies/2, etc.
// endpoints para obtener las peliculas, con path que tiene un recurso

const AcceptedOrigins = ['http://localhost:8080']

app.get('/movies', (req,res) =>{
    const origin = req.header('origin')
    if (AcceptedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin) // esto es para permitir que cualquier origen pueda acceder a este recurso, es decir, que cualquier página web pueda hacer peticiones a este endpoint, sin esta línea, solo se podrían hacer peticiones desde el mismo origen, es decir, desde la misma página web que está sirviendo el servidor, pero con esta línea, se permite que cualquier página web pueda hacer peticiones a este endpoint, incluso desde otro dominio, por ejemplo: http://localhost:5500/index.html, esto es útil para poder consumir este endpoint desde una página web que esté sirviendo otro servidor, por ejemplo: un servidor de desarrollo como live server o Vite
    }
    const { genre } = req.query
    if (genre) {
        const filtroMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filtroMovies)
    }
    res.json(movies)
})

// con el :id se identifica a un recurso que va después del movies/ y este responderá como id
app.get('/movies/:id', (req,res) => {
    const {id} = req.params // se obtiene el id del path
    const movie = movies.find(movie => movie.id == id) // esto hace que se busque la película con el id que se recibió en el path, y se guarda en la variable movie, el find devuelve el primer elemento que cumpla la condición, en este caso que el id de la película sea igual al id que se recibió en el path, si no encuentra ninguna película con ese id, devuelve undefined
    if (movie) return res.json(movie)

    res.status(404).json({message: "movie no encontrada"})    
})

// endpoint para crear una nueva película, con el método POST, el body de la petición debe contener un objeto con las propiedades tittle, year, director, genre y rating (opcional)

//validar con zod
app.post('/movies', (req,res) =>{
    const resultado = validateMovie(req.body)
    if (resultado.error) {
        return res.status(400).json({ error: JSON.parse(resultado.error.message)})
    }

    const newMovie = {
        ...resultado.data // esto hace que se tomen todas las propiedades del objeto resultado.data y se agreguen al nuevo objeto newMovie, es decir, se crea un nuevo objeto con las mismas propiedades que resultado.data, pero se le pueden agregar otras propiedades si se desea, por ejemplo: id: movies.length + 1, esto hace que se le asigne un id a la nueva película que sea igual al número de películas que hay en el array movies más uno, de esta manera se asegura que cada película tenga un id único y consecutivo
     }

    movies.push(newMovie)
    res.status(201).json(newMovie) // 
})

app.patch('/movies/:id', (req,res) =>{
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id) // esto hace que se busque la película con el id que se recibió en el path, y se guarda en la variable movie, el find devuelve el primer elemento que cumpla la condición, en este caso que el id de la película sea igual al id que se recibió en el path, si no encuentra ninguna película con ese id, devuelve undefined
    const resultado2 = validatePartialMovie(req.body)

    if (!resultado2.success) {
        return res.status(400).json({ error: JSON.parse(JSON.parse(resultado2.error.message))})
    }

    if (movieIndex === -1) {
        return res.status(404).json({message: "movie no encontrada"})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...resultado2.data
    }
    movies[movieIndex] = updateMovie
    return res.status(200).json(updateMovie)
    
})
    


const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);


});