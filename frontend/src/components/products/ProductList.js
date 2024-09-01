import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { fetchProducts, fetchProductsList } from '../../features/productSlice';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsList(page));
    }
  }, [status, dispatch, page]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4' component='h2' className={classes.title}>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {((products && products.length) || !products) == 0 && (
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant='h4' component='h2' className={classes.title}>
              Products will appear here...
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ProductList;
