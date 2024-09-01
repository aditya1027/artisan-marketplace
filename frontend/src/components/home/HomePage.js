import React, { useEffect } from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsList } from '../../features/productSlice';
import ProductCard from '../products/ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsList(1));
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant='h3' component='h1' className={classes.title}>
        Welcome to Our Artisan Marketplace
      </Typography>
      <Grid container spacing={3}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
