
import React from 'react';
import { Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { cinzel } from "@/lib/fonts";


const ItemCard = ({ title, image, href, variant = 'large' }) => {
  // Responsive heights per card type (tuned to match the design)
  const heights = {
    large: { xs: 420, md: 580 },
    medium: { xs: 240, md: 282 },
    middle:{xs:280,md:364},
    small: { xs: 220, md: 240 },
    smaller:{xs: 200, md: 200}

  };

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: 'none',
        '&:hover .fc-img': { transform: 'scale(1.04)' },
        '&:hover': { cursor: 'pointer' },
      }}
    >
      <CardActionArea component="a" href={href}>
        <Box sx={{ height: heights[variant], position: 'relative' }}>
          <CardMedia
            className="fc-img"
            component="img"
            image={image}
            alt={title}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              transition: 'transform .30s ease',
            }}
          />
          {/* Bottom overlay label */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.45)',
              color: '#fff',
              py: 1.25,
              px: 2,
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}
          >
            <Typography
              variant='title'
              sx={{
                letterSpacing: 1,
                fontWeight: 600,
                fontSize:"18px"
              }}
              className={cinzel.className}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default function ShopByCategory({ items = {} }) {
  const { left, middleTop, middleBottom, rightTop, rightBottom } = items;

  return (
    <Box className="container py-4">
    

      {/* Mosaic grid (Bootstrap) */}
      <Box className="row g-3">
        {/* Left: one large card */}
        <Box className="col-12 col-md-6 col-lg-4">
          {left && <ItemCard {...left} variant="large" />}
        </Box>

        {/* Middle: two medium stacked */}
        <Box className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-3">
          {middleTop && <ItemCard {...middleTop} variant="medium" />}
          {middleBottom && <ItemCard {...middleBottom} variant="medium" />}
        </Box>

        {/* Right: one large + one small stacked */}
        <Box className="col-12 col-md-12 col-lg-4 d-flex flex-column gap-3">
          {rightTop && <ItemCard {...rightTop} variant="middle" />}
          {rightBottom && <ItemCard {...rightBottom} variant="smaller" />}
              </Box>
      </Box>
    </Box>
  );
}
