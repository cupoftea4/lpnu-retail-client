import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1}}>
          Retail Master
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/products" sx={{ margin: '0 8px' }}>
            Products
          </Button>
          <Button color="inherit" component={RouterLink} to="/invoices" sx={{ margin: '0 8px' }}>
            Invoices
          </Button>
          {isAuthenticated() && (
            <>
              <Typography variant="subtitle1" sx={{ ml: 2, fontWeight: 'bold', color: 'background.default' }}>
                {currentUser ? `${currentUser.firstName} ${currentUser.secondName}` : 'User'}
              </Typography>
              <Button 
                variant="outlined" 
                onClick={logout} 
                sx={{ ml: 2, borderColor: 'error.main', color: 'error.main' }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
