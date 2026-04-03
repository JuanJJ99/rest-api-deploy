import { Router } from "express";
import movies from '../movies.json' with {type: 'json'}; // esto es para importar el archivo movies.json como un módulo de tipo json, esto es necesario porque a partir de la versión 14 de Node.js, se introdujo el concepto de módulos, y ahora se debe especificar el tipo de módulo que se está importando, en este caso, se especifica que se está importando un módulo de tipo json, esto hace que se pueda acceder a las propiedades del objeto movies directamente, sin necesidad de usar movies.default, como se hacía antes con CommonJS
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'; // para validar los datos que se reciben en el body de las peticiones


export const moviesRouter = Router();

moviesRouter.get('/', (req,res) => {
    const { genre } = req.query
    if (genre) {
        const filtroMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filtroMovies)
    }
    res.json(movies)

})

moviesRouter.get('/:id', (req,res) => {
    const {id} = req.params // se obtiene el id del path
    const movie = movies.find(movie => movie.id == id) // esto hace que se busque la película con el id que se recibió en el path, y se guarda en la variable movie, el find devuelve el primer elemento que cumpla la condición, en este caso que el id de la película sea igual al id que se recibió en el path, si no encuentra ninguna película con ese id, devuelve undefined
    if (movie) return res.json(movie)

    res.status(404).json({message: "movie no encontrada"})    
})

moviesRouter.post('/', (req,res) =>{
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

moviesRouter.patch('/:id', (req,res) =>{
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
