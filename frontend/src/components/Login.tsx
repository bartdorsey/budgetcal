import React, { useState, SyntheticEvent } from 'react';
import { useLoginMutation } from '../api/authApi';
import { useHistory } from 'react-router-dom';
import { setUser } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface LoginProps {}

function Login({}: LoginProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const [login, { isError, error }] = useLoginMutation();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    const user = await login({
      email,
      password,
    }).unwrap();
    if (user) {
      console.log(user);
      dispatch(setUser(user));
      history.push('/');
    }
  };

  return (
    <Dialog open={true} fullScreen={fullScreen}>
      <DialogTitle>Welcome to BudgetCal</DialogTitle>
      <DialogContent>
        <FormControl>
          <TextField
            id="email"
            aria-describedby="email"
            margin="dense"
            type="email"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
          />
          <TextField
            id="password"
            aria-describedby="username"
            margin="dense"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Login
          </Button>
          <Button onClick={() => history.push('/sign-up')} color="secondary">
            Sign Up
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
