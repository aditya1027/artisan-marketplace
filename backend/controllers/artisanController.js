import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import {
  generateToken,
  getTokenFromHeader,
  verifyToken,
} from '../utils/authTokenHelper.js';
import Artisan from '../model/Artisan.js';

export const registerArtisanController = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json({ error: 'Please provide body' });
    }

    //Check artisan exists
    const artisanExists = await Artisan.findOne({ email });
    if (artisanExists) {
      //throw error
      throw new Error('Artisan already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create & register
    const artisan = await Artisan.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      message: 'Artisan Registered successfully!!',
      data: artisan,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error occured body' });
  }
});

export const loginArtisanController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const artisan = await Artisan.findOne({ email });

  if (artisan && (await bcrypt.compare(password, artisan.password))) {
    res.json({
      artisan,
      status: 1,
      token: generateToken(artisan._id),
    });
  } else {
    throw new Error('Invalid credentials');
  }
});

// GET/api/v1/artisans/profile
export const getArtisanProfileController = asyncHandler(async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id).populate('products');
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }
    res.json(artisan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artisan details' });
  }
});
