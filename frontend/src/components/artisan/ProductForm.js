import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, makeStyles } from '@material-ui/core';
import { addProduct, updateProduct } from '../../features/productSlice';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const ProductForm = ({ product, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await dispatch(
          updateProduct({ id: product._id, ...formData })
        ).unwrap();
      } else {
        await dispatch(addProduct(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Typography variant='h6'>
        {product ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <TextField
        name='name'
        label='Product Name'
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name='description'
        label='Description'
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <TextField
        name='price'
        label='Price'
        type='number'
        value={formData.price}
        onChange={handleChange}
        required
      />
      <TextField
        name='imageUrl'
        label='Image URL'
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />
      <TextField
        name='category'
        label='Category'
        value={formData.category}
        onChange={handleChange}
        required
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes.submitButton}
      >
        {product ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
};

export default ProductForm;
