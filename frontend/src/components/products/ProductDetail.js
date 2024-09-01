import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Button,
  Grid,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { fetchProductDetails } from '../../features/productSlice';
import { addToCart } from '../../features/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  price: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  addToCart: {
    marginTop: theme.spacing(2),
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product: currentProduct, quantity: 1 }));
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color='error'>{error}</Typography>;
  }

  if (!currentProduct) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h4' component='h1'>
            {currentProduct.name}
          </Typography>
          <Typography variant='h5' component='p' className={classes.price}>
            ${currentProduct.price}
          </Typography>
          <Typography variant='body1'>{currentProduct.description}</Typography>
          <Button
            variant='contained'
            color='primary'
            className={classes.addToCart}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
