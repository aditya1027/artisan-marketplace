import Customer from '../model/Customer.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import {
  generateToken,
  getTokenFromHeader,
  verifyToken,
} from '../utils/authTokenHelper.js';

export const registerCustomerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check customer exists
  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    //throw error
    throw new Error('Customer already exists');
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create & register
  const customer = await Customer.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: 'success',
    message: 'Customer Registered successfully!!',
    data: customer,
  });
});

export const loginCustomerController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  if (customer && (await bcrypt.compare(password, customer.password))) {
    res.json({
      customer,
      status: 1,
      token: generateToken(customer._id),
    });
  } else {
    throw new Error('Invalid credentials');
  }
});

// GET/api/v1/customers/profile
export const getCustomerProfileController = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customerAuthId).populate(
    'orders'
  );
  if (customer) {
    res.json({
      status: 1,
      customer,
    });
  } else {
    throw new Error('Error occurred');
  }
});
