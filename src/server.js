import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// middleware
app.use(logger);
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// connecting to MongoDB
await connectMongoDB();

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
