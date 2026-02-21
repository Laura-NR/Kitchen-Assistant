import express, { json, urlencoded } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';


// importation du code des sous routeurs
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';
import categoriesRouter from "./routes/categories.js";
import kitchenRouter from './routes/kitchen.js';
import gardenRouter from './routes/garden.js';
import zeroWasteRouter from './routes/zerowaste.js';

// Create Express app
const app = express();

// Set up CORS
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { upload } from './config/multer.js';

// Multer middleware to parse form data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//Serving image files with express.static
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Define routes
app.use('/recipes', recipesRouter());
app.use('/categories', categoriesRouter());
app.use('/users', usersRouter());
app.use('/api/kitchen', kitchenRouter());
app.use('/api/garden', gardenRouter());
app.use('/api/zerowaste', zeroWasteRouter());

app.use('/', (req, res) => res.send('la bienvenue!'));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
