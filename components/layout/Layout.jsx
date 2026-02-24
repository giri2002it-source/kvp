// components/layout/StoreLayout.jsx

import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header'; 
import Footer from './Footer';
import { inter } from "@/lib/fonts";


const StoreLayout = ({ children, categories}) => {
  
  return (
    // Use Box for the overall layout wrapper
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', // Ensures the layout always takes up full viewport height
        bgcolor: '#fcfcfc', // Light background for the body content
      }}
    >
      {/* 1. Header Component */}
      <Header categories={categories}/>

      {/* 2. Main Content Area */}
      {/* This is where the content of the specific page (e.g., index.jsx, products.jsx) goes.
        We use flexGrow: 1 to push the footer down to the bottom of the screen.
        The Container provides horizontal centering and max-width.
      */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display:"flex",
          flexDirection:'column',
          width:'100%',
          alignItems:'center'
        }}
      className={inter.className}      >
        
          {children}
        
      </Box>

      {/* 3. Footer Component */}
      <Footer />
    </Box>
  );
};

export default StoreLayout;

