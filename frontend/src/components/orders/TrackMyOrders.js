import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchCustomerOrders,
  fetchcustomerOrders,
} from '../../features/orderSlice';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const TrackMyOrders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customer } = useSelector((state) => state.auth);
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (customer && customer.role === 'customer') {
      dispatch(fetchCustomerOrders(customer._id));
    } else {
      navigate('/login');
    }
  }, [dispatch, customer, navigate]);

  if (status === 'loading') {
    return <Typography>Loading orders...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color='error'>Error: {error}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4' gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>You haven't placed any orders yet.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <Paper key={order._id} className={classes.paper}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography component='h2' variant='h6' color='textPrimary'>
                      Order #{order._id}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        color='textPrimary'
                      >
                        Status: {order.status}
                      </Typography>
                      <br />
                      <Typography
                        component='span'
                        variant='body2'
                        color='textPrimary'
                      >
                        Total: ${order.totalPrice}
                      </Typography>
                      <br />
                      <Typography
                        component='span'
                        variant='body2'
                        color='textPrimary'
                      >
                        Shipping Address: {order.shippingAddress}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </div>
  );
};

export default TrackMyOrders;
