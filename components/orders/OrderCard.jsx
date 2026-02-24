// components/orders/OrderCard.jsx
import React from "react";
import { Card, CardContent, Typography, Chip, Box, Divider } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const OrderCard = ({ order }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "shipped":
        return <LocalShippingIcon fontSize="small" color="primary" />;
      case "delivered":
        return <CheckCircleIcon fontSize="small" color="success" />;
      case "placed":
        return <AccessTimeIcon fontSize="small" color="warning" />;
      default:
        return <AccessTimeIcon fontSize="small" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "placed":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        {/* Order Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            {order.productName}
          </Typography>
          <Chip
            label={order.status.toUpperCase()}
            color={getStatusColor(order.status)}
            icon={getStatusIcon(order.status)}
            size="small"
          />
        </Box>

        {/* Product Details */}
        <Typography variant="body2" color="text.secondary" mb={1}>
          {order.description}
        </Typography>

        {/* Variants */}
        <Box display="flex" gap={3} mb={2}>
          {order.color && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Color:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {order.color}
              </Typography>
            </Box>
          )}
          {order.size && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Size:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {order.size}
              </Typography>
            </Box>
          )}
          {order.quantity && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Qty:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {order.quantity}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Price and Delivery Info */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={700} color="primary">
              ¥{order.price.toLocaleString()}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              {getStatusIcon(order.status)}
              <Typography variant="body2" color="text.secondary">
                {order.deliveryInfo}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color={order.status === "shipped" ? "success.main" : "text.secondary"}>
            {order.statusMessage}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;