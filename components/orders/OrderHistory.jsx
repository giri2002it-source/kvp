// components/orders/OrderHistory.jsx
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Fade,
  Slide,
  Button,
  IconButton,
  Avatar,
  Badge,
  alpha,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import OrderCard from "./OrderCard";

// Trendy color palette
const COLORS = {
  primary: "#6366F1", // Indigo
  secondary: "#8B5CF6", // Violet
  success: "#10B981", // Emerald
  warning: "#F59E0B", // Amber
  error: "#EF4444", // Red
  background: "#F8FAFC", // Light slate
  cardBg: "#FFFFFF",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradient2: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  gradient3: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
};

// Comprehensive dummy order data
const dummyOrders = [
  {
    id: 1,
    productName: "FEEL TRACK Solid Men Dark Blue, Grey Track Pants",
    description: "Premium quality track pants with comfortable fabric and perfect fit for casual wear",
    color: "Dark Blue, Grey",
    size: "3XL",
    quantity: 1,
    price: 443,
    originalPrice: 599,
    discount: 26,
    status: "shipped",
    deliveryInfo: "Arriving tomorrow by 11 pm",
    statusMessage: "Your item has been shipped via Express Delivery",
    orderDate: "2024-12-07",
    estimatedDelivery: "2024-12-08",
    orderNumber: "ORD-7842",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Fashion",
    brand: "Urban Classics",
    rating: 4.2,
    reviews: 128,
    deliveryMethod: "Express",
    trackingNumber: "TRK78421563",
  },
  {
    id: 2,
    productName: "CROCO JAR 750 ml Glass Bottle",
    description: "Elegant glass bottle with crocodile embossed design, perfect for kitchen storage",
    color: "Clear",
    size: "750ml",
    quantity: 2,
    price: 263,
    originalPrice: 350,
    discount: 25,
    status: "placed",
    deliveryInfo: "Delivery expected by Sat Dec 13",
    statusMessage: "Your Order has been placed and is being processed",
    orderDate: "2024-12-07",
    estimatedDelivery: "2024-12-13",
    orderNumber: "ORD-7843",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Home & Living",
    brand: "Home Essentials",
    rating: 4.5,
    reviews: 89,
    deliveryMethod: "Standard",
  },
  {
    id: 3,
    productName: "Premium Cotton Oversized T-Shirt",
    description: "100% organic cotton t-shirt with premium finish and oversized fit",
    color: "White, Black",
    size: "L",
    quantity: 3,
    price: 299,
    originalPrice: 399,
    discount: 25,
    status: "delivered",
    deliveryInfo: "Delivered on Dec 5",
    statusMessage: "Your item has been delivered successfully",
    orderDate: "2024-12-01",
    deliveredDate: "2024-12-05",
    orderNumber: "ORD-7840",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Fashion",
    brand: "Minimalist Wear",
    rating: 4.7,
    reviews: 256,
    deliveryMethod: "Express",
    trackingNumber: "TRK78401547",
  },
  {
    id: 4,
    productName: "Noise Cancellation Wireless Headphones",
    description: "Premium wireless headphones with active noise cancellation and 30hr battery life",
    color: "Matte Black",
    size: null,
    quantity: 1,
    price: 899,
    originalPrice: 1299,
    discount: 31,
    status: "shipped",
    deliveryInfo: "Arriving by Dec 10",
    statusMessage: "Shipped via Express Delivery",
    orderDate: "2024-12-06",
    estimatedDelivery: "2024-12-10",
    orderNumber: "ORD-7841",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "SoundBeats",
    rating: 4.8,
    reviews: 534,
    deliveryMethod: "Express",
    trackingNumber: "TRK78418932",
  },
  {
    id: 5,
    productName: "Genuine Leather Bi-fold Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection and 12 card slots",
    color: "Cognac Brown",
    size: null,
    quantity: 1,
    price: 199,
    originalPrice: 299,
    discount: 33,
    status: "placed",
    deliveryInfo: "Expected by Dec 15",
    statusMessage: "Processing your order - ETA 3-5 business days",
    orderDate: "2024-12-07",
    estimatedDelivery: "2024-12-15",
    orderNumber: "ORD-7844",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    category: "Accessories",
    brand: "LeatherCraft",
    rating: 4.6,
    reviews: 187,
    deliveryMethod: "Standard",
  },
  {
    id: 6,
    productName: "Smart Watch Series 5 Pro",
    description: "Advanced smartwatch with ECG, blood oxygen monitoring, and fitness tracking",
    color: "Midnight Black",
    size: "44mm",
    quantity: 1,
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    status: "delivered",
    deliveryInfo: "Delivered on Dec 3",
    statusMessage: "Successfully delivered and signed for",
    orderDate: "2024-11-28",
    deliveredDate: "2024-12-03",
    orderNumber: "ORD-7839",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "TechWear",
    rating: 4.9,
    reviews: 892,
    deliveryMethod: "Express",
    trackingNumber: "TRK78394561",
  },
  {
    id: 7,
    productName: "Organic Bamboo Bed Sheet Set",
    description: "Luxury 1000 thread count bamboo bed sheets with temperature regulation",
    color: "Sage Green",
    size: "King",
    quantity: 1,
    price: 349,
    originalPrice: 499,
    discount: 30,
    status: "cancelled",
    deliveryInfo: "Order was cancelled",
    statusMessage: "Order cancelled by customer",
    orderDate: "2024-11-25",
    cancelledDate: "2024-11-26",
    orderNumber: "ORD-7838",
    image: "https://images.unsplash.com/photo-1556228578-9c360e2d0b4a?w=400&h=400&fit=crop",
    category: "Home & Living",
    brand: "SleepWell",
    rating: 4.4,
    reviews: 312,
    deliveryMethod: "Standard",
  },
  {
    id: 8,
    productName: "Wireless Earbuds Pro",
    description: "True wireless earbuds with spatial audio and water resistance",
    color: "White",
    size: null,
    quantity: 2,
    price: 599,
    originalPrice: 799,
    discount: 25,
    status: "returned",
    deliveryInfo: "Return processed",
    statusMessage: "Return completed - refund initiated",
    orderDate: "2024-11-20",
    returnedDate: "2024-11-28",
    orderNumber: "ORD-7837",
    image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e9?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "AudioPro",
    rating: 4.3,
    reviews: 421,
    deliveryMethod: "Express",
  },
  {
    id: 9,
    productName: "Yoga Mat Premium Edition",
    description: "Eco-friendly non-slip yoga mat with alignment markers and carrying strap",
    color: "Ocean Blue",
    size: "72x24 inches",
    quantity: 1,
    price: 149,
    originalPrice: 199,
    discount: 25,
    status: "delivered",
    deliveryInfo: "Delivered on Nov 30",
    statusMessage: "Delivered - Left at front door",
    orderDate: "2024-11-18",
    deliveredDate: "2024-11-30",
    orderNumber: "ORD-7836",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop",
    category: "Fitness",
    brand: "FlexiMat",
    rating: 4.8,
    reviews: 567,
    deliveryMethod: "Standard",
    trackingNumber: "TRK78367890",
  },
  {
    id: 10,
    productName: "Ceramic Coffee Mug Set",
    description: "Set of 4 handmade ceramic mugs with ergonomic handle design",
    color: "Terracotta",
    size: "400ml each",
    quantity: 1,
    price: 89,
    originalPrice: 129,
    discount: 31,
    status: "shipped",
    deliveryInfo: "Arriving by Dec 9",
    statusMessage: "Package in transit - last scanned at distribution center",
    orderDate: "2024-12-05",
    estimatedDelivery: "2024-12-09",
    orderNumber: "ORD-7845",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    category: "Home & Living",
    brand: "Artisan Pottery",
    rating: 4.7,
    reviews: 234,
    deliveryMethod: "Standard",
    trackingNumber: "TRK78452341",
  },
  {
    id: 11,
    productName: "Gaming Laptop Pro",
    description: "High-performance gaming laptop with RTX 4070 and 32GB RAM",
    color: "Lunar Gray",
    size: "17.3 inch",
    quantity: 1,
    price: 2199,
    originalPrice: 2799,
    discount: 21,
    status: "placed",
    deliveryInfo: "Expected by Dec 20",
    statusMessage: "Order confirmed - preparing for shipment",
    orderDate: "2024-12-06",
    estimatedDelivery: "2024-12-20",
    orderNumber: "ORD-7846",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    category: "Electronics",
    brand: "GameMaster",
    rating: 4.9,
    reviews: 1123,
    deliveryMethod: "Express",
  },
  {
    id: 12,
    productName: "Running Shoes Air Max",
    description: "Lightweight running shoes with air cushioning and breathable mesh",
    color: "Neon Green/Black",
    size: "US 10",
    quantity: 1,
    price: 399,
    originalPrice: 499,
    discount: 20,
    status: "delivered",
    deliveryInfo: "Delivered on Dec 2",
    statusMessage: "Delivered successfully",
    orderDate: "2024-11-29",
    deliveredDate: "2024-12-02",
    orderNumber: "ORD-7835",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Fashion",
    brand: "RunFast",
    rating: 4.6,
    reviews: 678,
    deliveryMethod: "Express",
    trackingNumber: "TRK78351234",
  },
];

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);

  const statusFilters = [
    { label: "All Orders", value: "all", count: dummyOrders.length, icon: DashboardIcon, color: COLORS.primary },
    { label: "Placed", value: "placed", count: dummyOrders.filter(o => o.status === "placed").length, icon: AccessTimeIcon, color: COLORS.warning },
    { label: "Shipped", value: "shipped", count: dummyOrders.filter(o => o.status === "shipped").length, icon: LocalShippingIcon, color: COLORS.primary },
    { label: "Delivered", value: "delivered", count: dummyOrders.filter(o => o.status === "delivered").length, icon: CheckCircleIcon, color: COLORS.success },
    { label: "Cancelled", value: "cancelled", count: dummyOrders.filter(o => o.status === "cancelled").length, icon: CancelIcon, color: COLORS.error },
    { label: "Returned", value: "returned", count: dummyOrders.filter(o => o.status === "returned").length, icon: CancelIcon, color: COLORS.error },
  ];

  const handleFilterChange = (value) => {
    setFilter(value);
    setShowFilters(false);
  };

  // Filter orders based on search and status filter
  const filteredOrders = dummyOrders.filter((order) => {
    const matchesSearch = 
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.color?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === "all" || order.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const totalSpent = dummyOrders.reduce((sum, order) => sum + order.price, 0);
  const deliveredCount = dummyOrders.filter(o => o.status === "delivered").length;
  const savedAmount = dummyOrders.reduce((sum, order) => sum + (order.originalPrice - order.price), 0);

  // Get popular categories
  const categoryCounts = dummyOrders.reduce((acc, order) => {
    acc[order.category] = (acc[order.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pb: 8,
    }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header with Stats */}
        <Slide in direction="down" timeout={500}>
          <Paper
            sx={{
background: `linear-gradient(135deg, #800020 0%, #a00025 50%, #bf0030 100%)`,
              color: 'white',
              p: { xs: 2, md: 3 },
              mb: 4,
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Background pattern */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }} />
            
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <DashboardIcon sx={{ fontSize: 32 }} />
                  <Typography variant="h4" fontWeight={800}>
                    Order Dashboard
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 500 }}>
                  Track, manage, and analyze all your purchases in one sleek dashboard
                </Typography>
              </Box>
              
              <Grid container spacing={2} sx={{ maxWidth: 600 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 1.5, 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" fontWeight={800}>
                      {dummyOrders.length}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Total Orders
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 1.5, 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" fontWeight={800}>
                      ¥{totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Total Spent
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 1.5, 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" fontWeight={800}>
                      {deliveredCount}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Delivered
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ 
                    p: 1.5, 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                  }}>
                    <Typography variant="h4" fontWeight={800}>
                      ¥{savedAmount}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Saved
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Slide>

        {/* Search and Controls Bar */}
        <Fade in timeout={600}>
          <Paper
            sx={{
              p: { xs: 1.5, md: 2 },
              mb: 3,
              borderRadius: 2,
              backgroundColor: COLORS.cardBg,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
            }}
          >
            {/* Small Search Field */}
            <Box sx={{ 
              position: 'relative',
              flex: 1,
              minWidth: { sm: 300 },
            }}>
              <TextField
                fullWidth
                placeholder="Search orders, products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: COLORS.primary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: alpha(COLORS.primary, 0.05),
                    '&:hover': {
                      backgroundColor: alpha(COLORS.primary, 0.08),
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      boxShadow: `0 0 0 2px ${alpha(COLORS.primary, 0.3)}`,
                    },
                  },
                }}
              />
              {searchQuery && (
                <Chip
                  label={`${filteredOrders.length} results`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: COLORS.gradient,
                    color: 'white',
                    fontWeight: 600,
                    height: 20,
                    fontSize: '0.7rem',
                  }}
                />
              )}
            </Box>

            {/* Controls */}
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  borderRadius: 2,
                  borderColor: alpha(COLORS.primary, 0.3),
                  color: COLORS.primary,
                  '&:hover': {
                    borderColor: COLORS.primary,
                    backgroundColor: alpha(COLORS.primary, 0.05),
                  },
                }}
              >
                Filters
              </Button>

              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                sx={{
                  borderRadius: 2,
                  borderColor: alpha(COLORS.primary, 0.3),
                  color: COLORS.primary,
                  '&:hover': {
                    borderColor: COLORS.primary,
                    backgroundColor: alpha(COLORS.primary, 0.05),
                  },
                }}
              >
                Sort
              </Button>

              <Box display="flex" gap={0.5} sx={{ backgroundColor: alpha(COLORS.primary, 0.05), borderRadius: 2, p: 0.5 }}>
                <IconButton
                  onClick={() => setViewMode("list")}
                  sx={{
                    backgroundColor: viewMode === "list" ? COLORS.primary : 'transparent',
                    color: viewMode === "list" ? 'white' : COLORS.primary,
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: viewMode === "list" ? COLORS.secondary : alpha(COLORS.primary, 0.1),
                    },
                  }}
                >
                  <ViewListIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode("grid")}
                  sx={{
                    backgroundColor: viewMode === "grid" ? COLORS.primary : 'transparent',
                    color: viewMode === "grid" ? 'white' : COLORS.primary,
                    borderRadius: 1.5,
                    '&:hover': {
                      backgroundColor: viewMode === "grid" ? COLORS.secondary : alpha(COLORS.primary, 0.1),
                    },
                  }}
                >
                  <ViewModuleIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Status Filters Chips */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {statusFilters.map((status) => {
              const Icon = status.icon;
              return (
                <Chip
                  key={status.value}
                  label={`${status.label} • ${status.count}`}
                  onClick={() => handleFilterChange(status.value)}
                  icon={<Icon style={{ color: filter === status.value ? 'white' : status.color }} />}
                  sx={{
                    backgroundColor: filter === status.value ? status.color : alpha(status.color, 0.1),
                    color: filter === status.value ? 'white' : status.color,
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 1,
                    '&:hover': {
                      backgroundColor: filter === status.value ? alpha(status.color, 0.8) : alpha(status.color, 0.2),
                    },
                    '& .MuiChip-icon': {
                      ml: 0.5,
                    },
                  }}
                />
              );
            })}
          </Box>
        </Fade>

        {/* Results Summary */}
        {searchQuery && (
          <Fade in timeout={400}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Found {filteredOrders.length} orders matching "{searchQuery}"
            </Typography>
          </Fade>
        )}

        {/* Orders Grid/List */}
        {filteredOrders.length > 0 ? (
          <Box
            sx={
              viewMode === "grid"
                ? {
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
                    gap: 3,
                  }
                : { display: 'flex', flexDirection: 'column', gap: 2 }
            }
          >
            {filteredOrders.map((order, index) => (
              <Fade in timeout={(index + 1) * 200} key={order.id}>
                <Box>
                  <OrderCard 
                    order={order} 
                    viewMode={viewMode}
                    colors={COLORS}
                  />
                </Box>
              </Fade>
            ))}
          </Box>
        ) : (
          <Fade in timeout={500}>
            <Paper
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: COLORS.cardBg,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <ReceiptIcon sx={{ fontSize: 64, color: alpha(COLORS.primary, 0.3), mb: 2 }} />
              <Typography variant="h5" fontWeight={600} color="text.secondary" gutterBottom>
                No orders found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                {searchQuery
                  ? `We couldn't find any orders matching "${searchQuery}". Try searching with different keywords.`
                  : `You don't have any ${filter !== "all" ? filter : ""} orders at the moment.`}
              </Typography>
              {searchQuery && (
                <Button
                  variant="contained"
                  onClick={() => setSearchQuery("")}
                  sx={{
                    background: COLORS.gradient,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                  }}
                >
                  Clear Search
                </Button>
              )}
            </Paper>
          </Fade>
        )}

        {/* Insights Panel */}
        {filteredOrders.length > 0 && filter === "all" && !searchQuery && (
          <Fade in timeout={1000}>
            <Paper
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                background: COLORS.gradient3,
                color: 'white',
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'white', color: COLORS.primary }}>
                    <TrendingUpIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      Your Shopping Insights
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      You've saved ¥{savedAmount} this month • Top category: {topCategory[0]} ({topCategory[1]} items)
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" gap={2}>
                  <Chip 
                    label="Most Purchased" 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                  <Chip 
                    label="Best Value" 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default OrderHistory;