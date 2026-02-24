// components/layout/Header.jsx

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Wishlist
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'; // Cart
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // Profile
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BadgeIcon from "@/components/generic/BadgeIcon";
import { useEffect } from "react";
import UserDrawer from './userDrawer';
import { slugify } from '@/utils/slugify';
import {contact}  from '@/pages/contact/index'
import {blog} from '@/components/blog/BlogPage'
import { getAllCategories } from "@/services/product-lisiting-services";
import {getHomePageDetails} from '@/services/homepageService'
import {blogDetails } from '@/components/blog/BlogPage'
// --- Theme and Color Definitions ---
// Note: In a real MUI setup, these colors would be defined in a theme file.
const PRIMARY_RED = '#8b0000'; // Deep red for the top bar
const ACCENT_GOLD = '#d4b47c'; // Gold/tan for the collection button background
const FONT_COLOR = '#333333'; // Default link color

// --- Styled Component for Search Bar ---

const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 5, // Slightly rounded corners for the search bar
  backgroundColor: alpha(theme.palette.common.white, 1), // Fully white background
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  // Search bar takes up most of the central space on desktop
  [theme.breakpoints.up('sm')]: {
    flexGrow: 1,
    maxWidth: 600,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  right: 0, // Position search icon on the right end of the input
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: PRIMARY_RED, // Icon color
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: PRIMARY_RED, // Input text color
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1.5),
    paddingRight: `calc(1em + ${theme.spacing(3)})`, // Make space for the icon
    transition: theme.transitions.create('width'),
  },
  '&::placeholder': {
    color: "red", // Set the placeholder text color
    opacity: 1, // Ensure full visibility, as some browsers reduce opacity by default
  },
}));

// --- Navigation Data ---
const mainNavLinks = [
  { id:1, title: 'Home', path: '/' },
  {id:2, title: 'New Arrivals', path: '/products?tag=new' },
  {id:3, title: 'Occasions', path: '/occasions' },
  { id:4,title: 'Blog', path: '/blog' },
  {id:5, title: 'Contact', path: '/contact' },
];
 
const Header = () => {
  const [categories, setCategories] = useState([]);
const [homeDetails, setHomeDetails] = useState(null);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data || []);

      const data1 = await getHomePageDetails();
      setHomeDetails(data1 || null);   // ✅ SET HERE

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);

  const [cartCount, setCartCount] = useState(0);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

useEffect(() => {
  // Load count on page load
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  setCartCount(cartItems.length);

  // Detect localStorage changes from other tabs or same tab
  window.addEventListener("storage", () => {
    const updated = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(updated.length);
  });
}, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // --- 1. Top Bar (Red Background) ---
  const renderTopBar = () => (
    <AppBar position="static" sx={{ boxShadow: 'none' }} className='primary-bg-clr'>
      <Toolbar
        sx={{
          minHeight: 80, // Taller toolbar for prominence
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 }
        }}
      >

        {/* Logo/Site Title */}
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='col-md-10 col-12'>
            <img src={'/assets/images/logo1.png'} width={"100%"} />
          </div>        </Link>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: { xs: 1, sm: 4 }, }}>
          <StyledSearch sx={{ borderRadius: "30px", color: "#999999" }} className='fs-16'>
            <StyledInputBase
              placeholder="Search for Products"
              inputProps={{ 'aria-label': 'search' }}
              color='#999999'
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </StyledSearch>
        </Box>

        {/* Action Icons (Wishlist, Cart, Profile) */}
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>

          <IconButton size="large" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>

          <Link href={"/cart"}><IconButton size="large" color="inherit">
            <BadgeIcon count={cartCount}>            <ShoppingBagOutlinedIcon />
            </BadgeIcon>
          </IconButton></Link>

          {/* Profile/Auth Icon - Placeholder for Login/Admin Check */}
          <IconButton size="large" color="inherit" onClick={() => setUserDrawerOpen(true)}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );

  // --- 2. Bottom Bar (Navigation) ---
  const renderNavBar = () => (
    <Toolbar
      sx={{
        minHeight: 50,
        bgcolor: 'white',
        borderBottom: `1px solid ${alpha(FONT_COLOR, 0.1)}`, // Subtle separator
        px: { xs: 2, sm: 4 },
        justifyContent: { xs: 'space-between', md: 'space-between' },
      }}
      disableGutters
    >
      {/* "All Collection" Dropdown Button */}
      <Button
        id="collection-button"
        aria-controls={open ? 'collection-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        endIcon={<ArrowDropDownIcon />}
        sx={{
          bgcolor: "#CEB666",
          color: "#fff",
          '&:hover': {
            bgcolor: alpha(ACCENT_GOLD, 0.8),
          },
          fontWeight: 600,
          textTransform: 'none',
          minWidth: 160
        }}
      >
        All Collection
      </Button>
      <Menu

        id="collection-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'collection-button',
        }}
      >
        {categories?.length > 0 ? (
  categories.map((item) => {
    const slug = slugify(item?.name);
    const href = `/category/${item?.id}-${slug}`;

    return (
      <Link
        key={item?.id}
        href={href}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={handleClose}
      >
        <MenuItem>
          {item?.name}
        </MenuItem>
      </Link>
    );
  })
) : (
  <MenuItem disabled>No Collections</MenuItem>
)}

      </Menu>

      {/* Main Navigation Links */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }} className='fs-16'>
  {mainNavLinks?.map((item) => {
    const slug = slugify(item?.path);
    // const href = `/category/${item?.id}-${slug}`;

    return (
      <Link
        key={item?.id}
        href={item?.path}
        style={{ textDecoration: 'none' }}
      >
        <Button
          color="inherit"
          sx={{
            mx: 1,
            color: FONT_COLOR,
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { bgcolor: 'transparent', color: PRIMARY_RED }
          }}
        >
          {item.title}
        </Button>
      </Link>
    );
  })}
</Box>

      <Box style={{ width: "200px" }}></Box>
      <UserDrawer
  open={userDrawerOpen}
  onClose={() => setUserDrawerOpen(false)}
/>

    </Toolbar>
    
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {renderTopBar()}
      {renderNavBar()}
    </Box>
  );
};

export default Header;