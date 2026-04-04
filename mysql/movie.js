import mysql from 'mysql2/promise';
const config = {
    host: 'localhost',
    user: 'root',
    port: 8080,
    password: '',
    database: 'BDDPrueba'
}
const connection = await mysql.createConnection(config);
export class MovieModel{
    static async getAll ({genre}){
        if (genre) {
            const lowerGenre = genre.toLowerCase();

            const [genres] = await connection.query(
                'SELECT id,name FROM genre WHERE LOWER(name) =?;', [lowerGenre]  // con el ? se deja un espacio para que la query lo complete con el primer valor que encuentre del array que se le pasa como segundo argumento al query
            )
            if (genres.length === 0) {return []}

            const [{id}] = genres;

            return []
        }  
        
        
        const [movies,info]= await connection.query(
            'SELECT * FROM movie;'
        )
        console.log(movies);
    }

    static async getById ({id}){
        const [movies,info] = await connection.query(
            'SELECT * FROM movie WHERE id=?;', [id]
        )
        if (movies.length === 0) {return null}
        return movies[0]
    }
    static async create ({input}){
        try {
        const {id,title,year,director, rating} = input
        const [result] = await connection.query(
            'INSERT INTO movie (tittle,year,director,rating) VALUES (?,?,?,?);', [title,year,director,rating]
        )
        const movieid = result.insertId
    }     catch (error) {
        console.error(error);
    }

        const [movie] = await connection.query(
            'SELECT * FROM movie WHERE id=?;', [movieid]
        )
        return movie[0]
    }
    static async update ({id, input}){
    }

}