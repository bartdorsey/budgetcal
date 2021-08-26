import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { useSignUpMutation } from '../api/authApi';
import {
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';

interface SignUpProps {}

function SignUp({}: SignUpProps) {
  const [signUp, { data, isLoading, isError, error }] = useSignUpMutation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: SyntheticEvent) => {
    const user = await signUp({
      username,
      email,
      password,
      confirmPassword,
    }).unwrap();
    if (user) {
      dispatch(setUser(user));
      history.push('/');
    }
  };

  console.dir(error?.data);

  return (
    <Dialog open={true} fullScreen={fullScreen}>
      <DialogTitle>Welcome to BudgetCal</DialogTitle>
      <DialogContent>
        <FormControl error={isError}>
          <TextField
            id="usermame"
            aria-describedby="username"
            margin="dense"
            type="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            error={isError}
            helperText={error?.data?.message}
            fullWidth
          />
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
          <TextField
            id="confirmPassword"
            aria-describedby="Confirm Password"
            margin="dense"
            label="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Sign Up
          </Button>
          <Button onClick={() => history.push('/login')} color="secondary">
            Login
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
