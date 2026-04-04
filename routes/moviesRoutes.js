import { Router } from "express";// para validar los datos que se reciben en el body de las peticiones
import { MovieCotroller } from "../controllers/movies.js";

export const moviesRouter = Router();

moviesRouter.get('/', MovieCotroller.getAll)

moviesRouter.get('/:id',MovieCotroller.getById)

moviesRouter.post('/',MovieCotroller.create)

moviesRouter.patch('/:id',MovieCotroller.update)
