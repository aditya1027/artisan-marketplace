import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  makeStyles,
} from '@material-ui/core';

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

const ReviewOrder = ({ cartItems, shippingAddress }) => {
  const classes = useStyles();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem className={classes.listItem} key={item.product.name}>
            <ListItemText
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant='body2'>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' className={classes.total}>
            ${total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            Shipping To,
          </Typography>
          <Typography gutterBottom>{shippingAddress}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReviewOrder;
