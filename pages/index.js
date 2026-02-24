// pages/index.jsx

import React, { useRef, useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import StoreLayout from '@/components/layout/Layout';
import BannerSlider from '@/components/home/Banner';
import Link from 'next/link';
import BlogSection from '@/components/blog/BlogSection';
import ShopByCategory from '@/components/home/ShopByCategory';
import SectionTitle from '@/components/generic/SectionTitle';
import DiscountSales from '@/components/home/DiscountSales';
import { getAllCategories } from '@/services/product-lisiting-services';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export const productData = [
  {
    image: "/assets/images/saree1.jpg",
    title: "Violet with Silver Zari",
    price: "3999",
    oldPrice: "4599",
    discount: "50%",
    id: 1
  },
  {
    image: "/assets/images/saree1.jpg",
    title: "Kanchi Cotton Saree",
    price: "3999",
    oldPrice: "4599",
    discount: "50%",
    id: 2
  },
  {
    image: "/assets/images/saree1.jpg",
    title: "Abstract Printed Cotton Saree",
    price: "3999",
    oldPrice: "4599",
    discount: "50%",
    id: 3
  },
  {
    image: "/assets/images/saree1.jpg",
    title: "Ideal Royal Blue Soft Silk Saree",
    price: "3999",
    oldPrice: "4599",
    discount: "50%",
    id: 4
  },
  {
    image: "/assets/images/saree1.jpg",
    title: "Ideal Royal Blue Soft Silk Saree",
    price: "3999",
    oldPrice: "4599",
    discount: "50%",
    id: 5
  },
  {
    image: "/assets/images/saree1.jpg",
    title: "Ideal Royal Blue Soft Silk Saree",
    price: "3999",
    oldPrice: "4599",
    discount: "50%",
    id: 6
  },
];

const HomePage = ({ categories }) => {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [wishlist, setWishlist] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  // Auto-scroll functionality
  useEffect(() => {
    let intervalId;

    if (isAutoScrolling && scrollRef.current) {
      intervalId = setInterval(() => {
        const scrollContainer = scrollRef.current;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // If we've reached the end, scroll back to start
        if (scrollContainer.scrollLeft >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll right by 320px (card width + gap)
          scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }, 3000); // Auto-scroll every 3 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoScrolling]);

  // Manual scroll functions
  const scrollLeft = () => {
    setIsAutoScrolling(false);
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  // Toggle wishlist
  const toggleWishlist = (id) => {
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Add to cart
  const handleAddToCart = (id) => {
    console.log('Adding to cart:', id);
    // Add your cart logic here
  };

  const demoItems = {
    left: {
      title: 'Banarasi Cotton',
      image: '/assets/images/sareeGreen.png',
      href: '/products/banarasi-cotton',
    },
    middleTop: {
      title: 'Woven Kanjivaram Silk Blend Saree',
      image: '/assets/images/sareeMerun.png',
      href: '/products/woven-kanjivaram-blend',
    },
    middleBottom: {
      title: 'Soft Pink Tissue Saree',
      image: '/assets/images/sareeGreen.png',
      href: '/products/soft-pink-tissue',
    },
    rightTop: {
      title: 'Woven Banarasi Art Silk Saree',
      image: '/assets/images/sareeGreen.png',
      href: '/products/woven-banarasi-art-silk',
    },
    rightBottom: {
      title: 'Teal Blue Cotton Saree',
      image: '/assets/images/foldsaree.png',
      href: '/products/teal-blue-cotton',
    },
  };

  console.log(categories, 'cate');

  return (
    <StoreLayout categories={categories}>
      <BannerSlider />

      <div className="container p-4 position-relative">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-center my-4">
          <div style={{ width: "60px", height: "1px", backgroundColor: "#000", marginRight: "15px" }}></div>
          <h5 style={{ margin: 0, fontWeight: "700", letterSpacing: "2px", fontSize: "20px", fontFamily: "serif" }}>
            NEW ARRIVALS
          </h5>
          <div style={{ width: "60px", height: "1px", backgroundColor: "#000", marginLeft: "15px" }}></div>
        </div>

        {/* Product Carousel Container with Center-Aligned Navigation Arrows */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow - Center Aligned */}
          <button
            onClick={scrollLeft}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 100,
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(206, 182, 102, 0.95)',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(206, 182, 102, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(206, 182, 102, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            &#x2039;
          </button>

          {/* Right Arrow - Center Aligned */}
          <button
            onClick={scrollRight}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 100,
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(206, 182, 102, 0.95)',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(206, 182, 102, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(206, 182, 102, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            &#x203A;
          </button>

          {/* Horizontal Scroll Product List */}
          <div
            ref={scrollRef}
            id="productScroll"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "20px",
              paddingBottom: "10px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              #productScroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {productData?.map((product, i) => (
              <div 
                key={i} 
                style={{ 
                  minWidth: "320px", 
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === i ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredCard === i ? '0 8px 24px rgba(0, 0, 0, 0.12)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href='/products/product' style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* Product Image Container */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                  }}>
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        transform: hoveredCard === i ? 'scale(1.08)' : 'scale(1)',
                      }}
                    />

                    {/* Wishlist Heart Button - Top Right */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#8B0000',
                        color: 'white',
                        borderRadius: '50%',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 2,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#A52A2A';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#8B0000';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {wishlist[product.id] ? (
                        <FavoriteIcon style={{ fontSize: '24px' }} />
                      ) : (
                        <FavoriteBorderIcon style={{ fontSize: '24px' }} />
                      )}
                    </button>

                    {/* Add to Cart Button - Shows on Hover */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        transform: hoveredCard === i ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.3s ease',
                        opacity: hoveredCard === i ? 1 : 0,
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product.id);
                        }}
                        style={{
                          width: '100%',
                          padding: '16px',
                          backgroundColor: '#8B0000',
                          color: 'white',
                          border: 'none',
                          textAlign: 'center',
                          fontWeight: '600',
                          fontSize: '16px',
                          letterSpacing: '1px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#A52A2A';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B0000';
                        }}
                      >
                        ADD TO CART
                        <ShoppingBagOutlinedIcon style={{ fontSize: '20px' }} />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div style={{
                    padding: '16px 8px',
                    backgroundColor: 'white',
                  }}>
                    {/* Product Title */}
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#333',
                      marginBottom: '12px',
                      minHeight: '44px',
                      lineHeight: '1.4',
                      fontFamily: 'serif',
                    }}>
                      {product.title}
                    </div>

                    {/* Price Section */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}>
                      {/* Current Price */}
                      <span style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#8B0000',
                        fontFamily: 'serif',
                      }}>
                        Rs. {product.price}
                      </span>

                      {/* Old Price */}
                      {product.oldPrice && (
                        <span style={{
                          fontSize: '18px',
                          fontWeight: '400',
                          color: '#999',
                          textDecoration: 'line-through',
                          fontFamily: 'serif',
                        }}>
                          RS. {product.oldPrice}
                        </span>
                      )}

                      {/* Discount Badge */}
                      {product.discount && (
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#FF9500',
                          fontFamily: 'sans-serif',
                        }}>
                          ({product.discount} off)
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DiscountSales />
      
      <>
        <SectionTitle title={"Shop By Category"} />
        <ShopByCategory items={demoItems} />
      </>
      
      <BlogSection />
    </StoreLayout>
  );
};

export default HomePage;

export async function getStaticProps() {
  const categories = (await getAllCategories()) || [];

  return {
    props: {
      categories: categories.filter(Boolean)
    }
  };
}