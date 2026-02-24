import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from 'next/router';

const UserDrawer = ({ open, onClose }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose();
    router.push("/login");
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight={700}>
            {isLoggedIn ? "My Account" : "Welcome"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* If NOT Logged In */}
        {!isLoggedIn && (
          <>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2, bgcolor: "#8b0000" }}
              onClick={() => {
                onClose();
                router.push("/login");
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                onClose();
                router.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </>
        )}

        {/* If Logged In */}
        {isLoggedIn && (
          <List>
            <ListItem button onClick={() => router.push('/orders')}>
              <ListItemText primary="My Orders" />
            </ListItem>

            <ListItem button onClick={() => router.push('/profile')}>
              <ListItemText primary="My Profile" />
            </ListItem>

            <Divider />

            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" sx={{ color: "red" }} />
            </ListItem>
          </List>
        )}

      </Box>
    </Drawer>
  );
};

export default UserDrawer
