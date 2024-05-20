import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
         그림판
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">Home</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
