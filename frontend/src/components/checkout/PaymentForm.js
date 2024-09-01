import React, { useState } from 'react';
import { TextField, Typography, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

const PaymentForm = () => {
  const classes = useStyles();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cardName'
              label='Name on card'
              fullWidth
              autoComplete='cc-name'
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cardNumber'
              label='Card number'
              fullWidth
              autoComplete='cc-number'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='expDate'
              label='Expiry date'
              fullWidth
              autoComplete='cc-exp'
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cvv'
              label='CVV'
              helperText='Last three digits on signature strip'
              fullWidth
              autoComplete='cc-csc'
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PaymentForm;
