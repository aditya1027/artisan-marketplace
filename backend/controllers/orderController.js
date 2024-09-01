import dotenv from 'dotenv';
dotenv.config();
import Order from '../model/Order.js';
import asyncHandler from 'express-async-handler';
import Customer from '../model/Customer.js';

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { customerId, products, totalPrice, shippingAddress } = req.body;
    const order = new Order({
      customer: customerId,
      products,
      totalPrice,
      shippingAddress,
      status: 'processing',
    });
    await order.save();
    await Customer.findByIdAndUpdate(customerId, {
      $push: { orders: order._id },
    });
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// get all orders
// GET /api/v1/orders
// private admin
export const fetchAllOrders = asyncHandler(async (req, res) => {
  //final all orders
  const orders = await Order.find();
  res.json({
    success: 1,
    message: 'All orders',
    orders,
  });
});

// get single order
// GET /api/v1/orders/:id
// private admin
export const getSingleOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.params.customerId,
    }).populate('products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

// Update order
// PUT /api/v1/orders/update/:id
// private admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId; // Changed from customerId to orderId
    const { status } = req.body;

    // Validate the new status
    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: 0,
        message:
          'Invalid status. Must be one of: processing, shipped, delivered, or cancelled',
      });
    }

    // Find the order and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: 0,
        message: 'Order not found',
      });
    }

    res.json({
      success: 1,
      message: 'Order status updated successfully',
      updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: 0,
      message: 'Failed to update order status',
      error: error.message,
    });
  }
});
