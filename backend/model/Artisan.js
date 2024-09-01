import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtisanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'artisan',
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);
//Compile the schema to model
const Artisan = mongoose.model('Artisan', ArtisanSchema);

export default Artisan;
