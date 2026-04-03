import z from 'zod' // para validar los datos que se reciben en el body de las peticiones

const movieSchema = z.object({ 
        id: z.number().int().positive(),
        title: z.string({required_error: "El título es requerido"}),
        year: z.number().int().positive().min(1900).max(2024),
        director: z.string({required_error: "El director es requerido"}),
        genre: z.array(z.enum(["Action", "Sci-Fi", "Thriller","Adventure", "Drama", "Terror","Crime"])),
        rating: z.number().min(0).max(10).optional().default(0)
    })

export function validateMovie (object) {
    return movieSchema.safeParse(object)
}

export function validatePartialMovie (object){
    return movieSchema.partial().safeParse(object)
}
