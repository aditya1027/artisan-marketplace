import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

import {
  getArtisanProfileController,
  loginArtisanController,
  registerArtisanController,
} from '../controllers/artisanController.js';

const artisanRoutes = express.Router();

artisanRoutes.post('/register', registerArtisanController);
artisanRoutes.post('/login', loginArtisanController);
artisanRoutes.get('/:id', getArtisanProfileController);

export default artisanRoutes;
