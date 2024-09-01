import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  artisanRegister,
  customerRegister,
  login,
  loginArtisan,
  loginCustomer,
} from '../../features/authSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role == 'customer') {
        await dispatch(
          customerRegister({ name, email, password, role })
        ).unwrap();
      } else {
        await dispatch(
          artisanRegister({ name, email, password, role })
        ).unwrap();
      }

      if (role == 'customer') {
        await dispatch(loginCustomer({ email, password })).unwrap();
      } else {
        await dispatch(loginArtisan({ email, password })).unwrap();
      }
      if (role == 'customer') {
        navigate('/');
      } else {
        navigate('/artisan/dashboard');
      }
    } catch (err) {
      console.error('Failed to register: ', err);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl variant='outlined' fullWidth margin='normal'>
            <InputLabel id='role-label'>Role</InputLabel>
            <Select
              labelId='role-label'
              id='role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label='Role'
            >
              <MenuItem value='customer'>Customer</MenuItem>
              <MenuItem value='artisan'>Artisan</MenuItem>
            </Select>
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={status === 'loading'}
          >
            Sign Up
          </Button>
          {error && <Typography color='error'>{error}</Typography>}
          <Link to='/login' variant='body2'>
            {'Already have an account? Sign In'}
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Register;
