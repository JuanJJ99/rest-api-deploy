// import { MovieModel } from "../models/movie.js"
import { MovieModel } from "../mysql/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieCotroller {
    static async getAll (req,res) {
        try {
            const { genre } = req.query
            const movies = await MovieModel.getAll({ genre })
            res.json(movies)
        } catch (error) {
            res.status(500).json({message: "Error interno del servidor"})
        }
}
    static async getById (req,res) {
        try {
            const {id} = req.params // se obtiene el id del path
            const movie = await MovieModel.getById({ id })
            if (movie) return res.json(movie)
            res.status(404).json({message: "movie no encontrada"})    
        } catch (error) {
            res.status(500).json({message: "Error interno del servidor"})
        }
    }
    static async create (req,res) {
        try {   
            const resultado = validateMovie(req.body)
            if (resultado.error) {
                return res.status(400).json({ error: JSON.parse(resultado.error.message)})
            }
            const newMovie = await MovieModel.create({ input: resultado.data })
            res.status(201).json(newMovie) // 
        } catch (error) {
            res.status(500).json({message: "Error interno del servidor"})
        }
}
static async update (req,res) {
    try {
    const resultado2 = validatePartialMovie(req.body)
    if (!resultado2.success) {
        return res.status(400).json({ error: JSON.parse(JSON.parse(resultado2.error.message))})
    }
    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: resultado2.data })
    return res.status(200).json(updateMovie)
} catch (error) {
    res.status(500).json({message: "Error interno del servidor"})
}
}




}