import User from '../model/Customer.js';
import { getTokenFromHeader, verifyToken } from '../utils/authTokenHelper.js';

export const isLoggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    throw new Error('Invalid/Expired token, please login again');
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);
  //Check if admin
  if (user && user.isAdmin) {
    next();
  } else {
    next(new Error('Access denied, admin only'));
  }
};

export const isArtisan = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);
  //Check if artisan
  if (user && user.role && user.role == 'artisan') {
    next();
  } else {
    next(new Error('Access denied, artisan only'));
  }
};

export const isCustomer = async (req, res, next) => {
  const user = await User.findById(req.userAuthId);
  //Check if customer
  if (user && user.role && user.role == 'customer') {
    next();
  } else {
    next(new Error('Access denied, customer only'));
  }
};
