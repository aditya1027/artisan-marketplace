import React from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Add, Remove, Delete } from '@material-ui/icons';
import { removeFromCart, updateQuantity } from '../../features/cartSlice';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const CartItem = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.product._id));
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(
        updateQuantity({ productId: item.product._id, quantity: newQuantity })
      );
    }
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={item.product.name}
        secondary={
          <Typography
            component='span'
            variant='body2'
            className={classes.inline}
            color='textPrimary'
          >
            ${item.product.price} x {item.quantity}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge='end'
          aria-label='decrease'
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity === 1}
        >
          <Remove />
        </IconButton>
        <Typography component='span' style={{ margin: '0 10px' }}>
          {item.quantity}
        </Typography>
        <IconButton
          edge='end'
          aria-label='increase'
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
        >
          <Add />
        </IconButton>
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={handleRemoveFromCart}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CartItem;
