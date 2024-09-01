import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  makeStyles,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { logout } from '../../features/authSlice';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const { customer } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          <RouterLink to='/' className={classes.link}>
            Artisan Marketplace
          </RouterLink>
        </Typography>
        <Button color='inherit' component={RouterLink} to='/products'>
          Products
        </Button>

        {customer ? (
          <>
            {customer.role == 'artisan' && (
              <Button
                color='inherit'
                component={RouterLink}
                to='/artisan/dashboard'
              >
                Dashboard
              </Button>
            )}
            {JSON.parse(JSON.stringify(customer)).role == 'customer' && (
              <Button color='inherit' component={RouterLink} to='/my-orders'>
                My Orders
              </Button>
            )}
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color='inherit' component={RouterLink} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={RouterLink} to='/register'>
              Register
            </Button>
          </>
        )}
        <IconButton color='inherit' component={RouterLink} to='/cart'>
          <Badge badgeContent={items.length} color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
