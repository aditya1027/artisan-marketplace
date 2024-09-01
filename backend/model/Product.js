import mongoose from 'mongoose';
const Schemma = mongoose.Schema;

const ProductSchema = new Schemma(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Artisan',
    },
    images: [
      {
        type: String,
        default:
          'https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-websites-1037719204',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
