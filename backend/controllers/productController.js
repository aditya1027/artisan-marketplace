import asyncHandler from 'express-async-handler';
import Product from '../model/Product.js';
import Artisan from '../model/Artisan.js';
import mongoose from 'mongoose';

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, images, artisanId } = req.body;
    //Product exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
      throw new Error('Product Already exists');
    }

    const product = new Product({
      name,
      description,
      price,
      images,
      artisan: artisanId,
    });
    await product.save();

    await Artisan.findByIdAndUpdate(artisanId, {
      $push: { products: product._id },
    });
    res
      .status(201)
      .json({ status: 1, message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

//Get all products
export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { sort, filter, minPrice, maxPrice } = req.query;
    let query = Product.find();

    if (sort) {
      query = query.sort(sort);
    }

    if (minPrice) {
      query = query.where('price').gte(minPrice);
    }

    if (maxPrice) {
      query = query.where('price').lte(maxPrice);
    }

    if (filter) {
      query = query.where(JSON.parse(filter));
    }

    const products = await query.exec();
    res.json({ status: 1, products });
  } catch (error) {
    res.status(500).json({ status: 2, error: 'Failed to fetch products' });
  }
});

//Get single product
export const getProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: 2, error: 'Invalid product ID' });
    }

    const product = await Product.findById(id).populate('artisan');
    if (!product) {
      return res.status(404).json({ status: 2, error: 'Product not found' });
    }
    res.json({
      status: 1,
      product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

//Update single product
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, images, artisanId } = req.body;

  //update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      images,
      artisanId,
    },
    {
      new: true,
    }
  );
  res.json({
    status: 1,
    message: 'Product updated',
    product,
  });
});

//Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: 1,
    message: 'Product delteted',
  });
});
