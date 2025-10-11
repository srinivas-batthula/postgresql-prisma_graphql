// src/server.ts
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.ts';
import errorHandler from './middlewares/errorHandler.ts';
import { createGraphQLServer } from './graphql/index.ts';

dotenv.config(); // import all .env var's...

async function bootstrap() {
    const app: express.Application = express();

    app.use(express.json());
    app.use(cors());

    // Create 'GraphQL-server' and apply as middleware...
    const gqlServer = await createGraphQLServer();
    gqlServer.applyMiddleware({ app, path: '/graphql' });

    // REST routes
    app.get('/', (req, res) => {
        res.status(200).json({
            success: true,
            message: `${req.url} API is Live!\nGo to '/api/users' to access content...`,
        });
    });

    app.use('/api/users', userRouter);
    app.use(errorHandler);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running (REST APIs) at http://localhost:${PORT}`);
        console.log(`->GraphQL available at http://localhost:${PORT}/graphql`);
    });
}

bootstrap();
