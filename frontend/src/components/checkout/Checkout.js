import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddressForm from './AddressForm';
import ReviewOrder from './ReviewOrder';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/cartSlice';
import { placeOrder } from '../../features/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Review your order'];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <AddressForm onAddressChange={props.onAddressChange} />;
    case 1:
      return (
        <ReviewOrder
          cartItems={props.cartItems}
          shippingAddress={props.shippingAddress}
        />
      );
    default:
      throw new Error('Unknown step');
  }
}

const Checkout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.total);
  const customer = useSelector((state) => state.auth.customer);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddressChange = (address) => {
    setShippingAddress(address);
  };

  const handlePlaceOrder = async () => {
    if (!customer || customer.role !== 'customer') {
      navigate('/login', { state: { from: location } });
      return;
    }
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalPrice,
        shippingAddress,
      };

      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      handleNext();
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  if (!customer || customer.role != 'customer') {
    return (
      <Typography>
        Please log in as a customer to proceed with checkout.
      </Typography>
    );
  }

  return (
    <div className={classes.layout}>
      <Typography component='h1' variant='h4' align='center'>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant='h5' gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant='subtitle1'>
              Your order has been placed. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep, {
              onAddressChange: handleAddressChange,
              cartItems,
              shippingAddress,
            })}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant='contained'
                color='primary'
                onClick={
                  activeStep === steps.length - 1
                    ? handlePlaceOrder
                    : handleNext
                }
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};

export default Checkout;
