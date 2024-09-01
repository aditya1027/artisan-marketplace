import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { Add, Remove, Delete } from '@material-ui/icons';
import { removeFromCart, updateQuantity } from '../../features/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  total: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  return (
    <div>
      <Typography variant='h4' component='h2'>
        Your Cart
      </Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List className={classes.root}>
            {items.map((item) => (
              <ListItem key={item.product._id}>
                <ListItemText
                  primary={item.product.name}
                  secondary={`$${item.product.price} x ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='decrease'
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <Remove />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='increase'
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity + 1)
                    }
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => handleRemove(item.product._id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant='h6' className={classes.total}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            color='primary'
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
