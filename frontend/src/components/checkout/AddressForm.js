import React, { useState } from 'react';
import { TextField, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

const AddressForm = ({ onAddressChange }) => {
  const classes = useStyles();
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    // Merge all details into one string
    const fullAddress = `${address.firstName} ${address.lastName}, ${address.address1}, ${address.address2}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
    onAddressChange(fullAddress);
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping address
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='firstName'
              name='firstName'
              label='First name'
              fullWidth
              autoComplete='given-name'
              value={address.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last name'
              fullWidth
              autoComplete='family-name'
              value={address.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='address1'
              name='address1'
              label='Address line 1'
              fullWidth
              autoComplete='shipping address-line1'
              value={address.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='address2'
              name='address2'
              label='Address line 2'
              fullWidth
              autoComplete='shipping address-line2'
              value={address.address2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='city'
              name='city'
              label='City'
              fullWidth
              autoComplete='shipping address-level2'
              value={address.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='state'
              name='state'
              label='State/Province/Region'
              fullWidth
              value={address.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='zipCode'
              name='zipCode'
              label='Zip / Postal code'
              fullWidth
              autoComplete='shipping postal-code'
              value={address.zipCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              autoComplete='shipping country'
              value={address.country}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default AddressForm;
