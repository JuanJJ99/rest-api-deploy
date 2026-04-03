import cors from 'cors';
const AcceptedOrigins = ['http://localhost:8080','http://localhost:5500','*'];
const corsMiddleware = (aceptedOrigins = AcceptedOrigins) => cors({
    origin: (origin, callback) => {
        if (!origin || AcceptedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
});

export default corsMiddleware;