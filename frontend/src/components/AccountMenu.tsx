import React, { useState } from 'react';
import useAuthRequired from '../hooks/useAuthRequired';
import { IconButton, Menu, MenuItem, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../slices/authSlice';
import { useLogoutMutation } from '../api/authApi';
import { useHistory } from 'react-router-dom';

type AccountMenuProps = {};

function AccountMenu({}: AccountMenuProps) {
  const { authenticated, isLoading, isUninitialized } = useAuthRequired();
  const dispatch = useDispatch();
  const history = useHistory();
  const [logout] = useLogoutMutation();
  console.log(authenticated);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout().unwrap();
    dispatch(deleteUser());
    history.push('/login');
  };

  if (isLoading || isUninitialized) {
    return null;
  }

  if (authenticated) {
    return (
      <>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => history.push('/sign-up')} color="inherit">
        Sign Up
      </Button>
      <Button onClick={() => history.push('/login')} color="inherit">
        Login
      </Button>
    </>
  );
}

export default AccountMenu;
