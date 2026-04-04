import movies from '../movies.json' with {type: 'json'};

export class MovieModel { 
    static async getAll  ({ genre }){
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById ({ id }) {
        const movie = movies.find(movie => movie.id == id)
        if (movie) return movie
    }

    static async create ({ resultado }) {
        const newMovie = {
        ...resultado // esto hace que se tomen todas las propiedades del objeto resultado.data y se agreguen al nuevo objeto newMovie, es decir, se crea un nuevo objeto con las mismas propiedades que resultado.data, pero se le pueden agregar otras propiedades si se desea, por ejemplo: id: movies.length + 1, esto hace que se le asigne un id a la nueva película que sea igual al número de películas que hay en el array movies más uno, de esta manera se asegura que cada película tenga un id único y consecutivo
        }
        movies.push(newMovie)
        return newMovie
    }

    static async update ({ id, resultado2 }) {
        const movieIndex = movies.findIndex(movie => movie.id == id) // esto hace que se busque la película con el id que se recibió en el path, y se guarda en la variable movie, el find devuelve el primer elemento que cumpla la condición, en este caso que el id de la película sea igual al id que se recibió en el path, si no encuentra ninguna película con ese id, devuelve undefined
        if (movieIndex === -1) {
        return res.status(404).json({message: "movie no encontrada"})
    }
        const updateMovie = {
        ...movies[movieIndex],
        ...resultado2
        }

        return movies[movieIndex]
    }
}