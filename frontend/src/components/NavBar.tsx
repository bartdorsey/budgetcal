import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLogoutMutation } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../slices/authSlice';
import useAuthRequired from '../hooks/useAuthRequired';
import { IoIosLogIn, IoIosHome, IoIosLogOut } from 'react-icons/io';
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface NavBarProps {}

function NavBar({}: NavBarProps) {
  const { isError, isLoading, isUninitialized } = useAuthRequired();
  const dispatch = useDispatch();
  const history = useHistory();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(deleteUser());
    history.push('/login');
  };

  if (isLoading || isUninitialized) {
    return null;
  }

  const loggedInMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Home</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </MenuList>
  );

  const loggedOutMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Home</MenuItem>
      <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>
      <MenuItem onClick={() => history.push('/sign-up')}>Sign Up</MenuItem>
    </MenuList>
  );

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Menu"
        icon={<HamburgerIcon />}
        variant="Outline"
      />
      {isError ? loggedOutMenu : loggedInMenu}
    </Menu>
  );
}

export default NavBar;
