import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.ts';
import errorHandler from './middlewares/errorHandler.ts';

dotenv.config(); // import all .env var's...

const app = express();

app.use(express.json());
app.use(cors());

// Routes...
app.get('/', async (req, res) => {
    return res.status(200).json({ success: true, message: `${req.url} API is Live!\nGo to '/api/users' to access content...` });
});

app.use('/api/users', userRouter);

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
