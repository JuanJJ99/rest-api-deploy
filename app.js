// para iniciar
// el node --watch ./app.js es para que se reinicie el servidor cada vez que se haga un cambio en el código
import express, { json } from 'express';
import { moviesRouter } from './routes/moviesRoutes.js'; // para manejar las rutas relacionadas con las películas, esto hace que se pueda organizar mejor el código, y se puedan separar las rutas relacionadas con las películas en un archivo diferente, lo que hace que el código sea más limpio y fácil de mantener
import corsMiddleware from './middlewares/cors.js'; // para manejar el CORS, esto es necesario para permitir que las peticiones que se hagan desde un origen diferente al del servidor puedan acceder a los recursos del servidor, por ejemplo, si se hace una petición desde una página web que está sirviendo otro servidor, como un servidor de desarrollo como live server o Vite, esta petición no podrá acceder a los recursos del servidor a menos que se permita el CORS, con esta línea se importa el middleware de CORS que se ha definido en el archivo middlewares/cors.js, y luego se puede usar este middleware en la aplicación para permitir el acceso a los recursos del servidor desde otros orígenes

//const movies = require('./movies.json');
//const app = express();
//const {validateMovie, validatePartialMovie} = require('./schemas/movies') // para validar los datos que se reciben en el body de las peticiones

const app = express();
app.use(json()) // para que el servidor pueda entender el formato json en el body de las peticiones
app.use(corsMiddleware());



app.use('/movies', moviesRouter) // esto hace que todas las rutas que se definan en moviesRouter se identifiquen con el path /movies, por ejemplo: /movies/1, /movies/2, etc.

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);

});