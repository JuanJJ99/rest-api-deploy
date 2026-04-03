fetch('http://localhost:3000/movies')
    .then(res => res.json())
    .then(movies => {
        const html = movies.map(movie => {
            return `
            <div
            <h2>${movie.title}</h2>
            <p>${movie.year}</p>
            <img src="./imagenes/productos/${movie.id}/principal.png" alt="${movie.title} poster" />
            <p>${movie.director}</p>    
            <p>${movie.genre.join(', ')}</p>
            <p>${movie.rating}</p>
            
            </div>
            `
        }).join('')

        document.getElementById('movies').innerHTML = html
    })