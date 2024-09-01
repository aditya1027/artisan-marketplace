import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import {
  fetchArtisanProducts,
  deleteProduct,
} from '../../features/productSlice';
import ProductForm from './ProductForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  addButton: {
    marginBottom: theme.spacing(3),
  },
}));

const ArtisanDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { artisanProducts, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchArtisanProducts(user._id));
    }
  }, [dispatch, user]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.title}>
        Artisan Dashboard
      </Typography>
      <Button
        variant='contained'
        color='primary'
        className={classes.addButton}
        onClick={() => {
          /* Open ProductForm */
        }}
      >
        Add New Product
      </Button>
      <List>
        {artisanProducts.map((product) => (
          <ListItem key={product._id}>
            <ListItemText
              primary={product.name}
              secondary={`$${product.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='edit'
                onClick={() => {
                  /* Open ProductForm with product data */
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => handleDeleteProduct(product._id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {/* ProductForm component (modal or separate route) */}
    </div>
  );
};

export default ArtisanDashboard;
