
import React, { useEffect, useState } from "react";
import Image from "next/image";

// const COLOR_FALLBACKS = [
//   "#C19A6B",
//   "#000000",
//   "#8B0000",
//   "#006400",
//   "#000080",
// ];

export default function ProductCard({ item }) {
  const skus = item?.skus || [];

  const [activeSkuIndex, setActiveSkuIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeSku = skus[activeSkuIndex];
  const images = activeSku?.imageDtos || [];

  /* Auto rotate SKU colors */
  useEffect(() => {
    if (skus.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSkuIndex((prev) => (prev + 1) % skus.length);
      setActiveImageIndex(0);
    }, 3000);

    return () => clearInterval(interval);
  }, [skus.length]);

  /* Auto rotate images inside SKU */
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="product-card">

      {/* Modern Floating Image */}
      <div className="image-wrapper">
        <Image
          src={
            images[activeImageIndex]?.url ||
            "/assets/images/placeholder.png"
          }
          alt={item?.productTitle || "Product"}
          width={300}
          height={260}
          className="product-img"
        />
      </div>

      {/* Details */}
      <div className="content">
        <p className="title">{item?.productTitle}</p>

        <div className="price">
          ₹{item?.isPrice}
          {item?.wasPrice && (
            <span className="old">₹{item?.wasPrice}</span>
          )}
        </div>

        {/* Color Options */}
        <div className="colors">
          {skus.map((sku, index) => (
            <span
              key={sku.skuId}
              className={`color-dot ${
                index === activeSkuIndex ? "active" : ""
              }`}
              style={{
                backgroundColor:
                  sku.hexCode || ""
              }}
              title={sku.values?.[0]}
              onMouseEnter={() => {
                setActiveSkuIndex(index);
                setActiveImageIndex(0);
              }}
            />
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .product-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          padding: 14px;
          box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
          transition: 0.25s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.12);
        }

        .image-wrapper {
          width: 100%;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #fff; /* clean background */
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .content {
          margin-top: 14px;
        }

        .title {
          font-size: 15px;
          font-weight: 500;
          color: #222;
          min-height: 40px;
        }

        .price {
          margin-top: 6px;
          font-size: 18px;
          font-weight: 600;
          color: #800020;
        }

        .price .old {
          margin-left: 8px;
          text-decoration: line-through;
          font-size: 14px;
          color: #999;
        }

        .colors {
          margin-top: 12px;
          display: flex;
          gap: 8px;
        }

        .color-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #ccc;
          cursor: pointer;
          transition: 0.2s;
        }

        .color-dot.active {
          outline: 2px solid #800020;
        }
      `}</style>
    </div>
  );
}
