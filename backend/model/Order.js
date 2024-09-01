import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

const OrderSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    shippingAddress: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: Number,
      default: 0.0,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered'],
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
