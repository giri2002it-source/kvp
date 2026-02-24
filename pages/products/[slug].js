import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreLayout from "@/components/layout/Layout";
import { addToCart } from "@/utils/addToCart";
import { getAllProducts } from "@/services/product-services";
import { slugify } from "@/utils/slugify";
import { getAllCategories } from "@/services/product-lisiting-services";

const PLACEHOLDER_IMG = "/assets/images/placeholder.png";

/* ---------- HELPERS ---------- */

const getImagesFromSku = (sku) =>
  sku?.imageDtos?.map(i => i.url).filter(Boolean) || [];

const normalizeSku = (sku) => {
  const colorAttr = sku.attributes?.find(a => a.attributeName === "Color");
  const sizeAttr = sku.attributes?.find(a => a.attributeName === "Size");

  return {
    ...sku,
    color: colorAttr?.values?.[0] || null,
    hexCode: sku.hexCode || colorAttr?.hexCode || "#ccc",
    size: sizeAttr?.values?.[0] || null,
    stock: sku.stockQuantity ?? 0,
    images: getImagesFromSku(sku)
  };
};

export default function ProductDetail({ product, categories }) {

  /* ---------- NORMALIZED SKUS ---------- */
  const skus = useMemo(
    () => (product?.skus || []).map(normalizeSku),
    [product?.skus]
  );

  /* ---------- AVAILABLE OPTIONS ---------- */
  const colors = useMemo(() => {
    return [...new Map(
      skus.filter(s => s.color).map(s => [s.color, s])
    ).values()];
  }, [skus]);

  const sizes = useMemo(() => {
    return [...new Set(
      skus.filter(s => s.size).map(s => s.size)
    )];
  }, [skus]);

  /* ---------- STATE ---------- */
  const [selectedColor, setSelectedColor] = useState(colors[0]?.color || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeSku, setActiveSku] = useState(null);
  const [qty, setQty] = useState(1);

  /* ---------- VALID OPTIONS ---------- */
  const validSizesForColor = useMemo(() => {
    return skus
      .filter(s => s.color === selectedColor && s.stock > 0)
      .map(s => s.size);
  }, [selectedColor, skus]);

  const validColorsForSize = useMemo(() => {
    if (!selectedSize) return colors.map(c => c.color);
    return skus
      .filter(s => s.size === selectedSize && s.stock > 0)
      .map(s => s.color);
  }, [selectedSize, skus, colors]);

  /* ---------- AUTO SWITCH ---------- */
  useEffect(() => {
    if (selectedSize && !validSizesForColor.includes(selectedSize)) {
      setSelectedSize(validSizesForColor[0] || null);
    }
  }, [selectedColor]);

  /* ---------- ACTIVE SKU ---------- */
  useEffect(() => {
    const sku = skus.find(
      s => s.color === selectedColor && (!selectedSize || s.size === selectedSize)
    );
    setActiveSku(sku || null);
  }, [selectedColor, selectedSize, skus]);

  /* ---------- IMAGES ---------- */
  const thumbnails = activeSku?.images?.length
    ? activeSku.images
    : [PLACEHOLDER_IMG];

  const [mainImage, setMainImage] = useState(thumbnails[0]);

  useEffect(() => {
    setMainImage(thumbnails[0]);
  }, [activeSku]);

  /* ---------- CART ---------- */
  const handleAddToCart = () => {
    if (!activeSku) return;
    addToCart({
      id: activeSku.id,
      title: product.productTitle,
      price: activeSku.price ?? product.isPrice,
      image: mainImage,
      qty,
      skuCode: activeSku.skuCode,
      productId: product.id,
    });
  };

  return (
    <StoreLayout categories={categories}>
      <div className="container mt-3">
        <div className="row">

          {/* LEFT IMAGE COLUMN */}
          <div className="col-12 col-md-6 d-md-flex gap-3">

            {/* DESKTOP THUMBNAILS */}
            <div className="d-none d-md-flex flex-column">
              {thumbnails.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  style={{
                    width: 86,
                    height: 96,
                    borderRadius: 8,
                    cursor: "pointer",
                    marginBottom: 12,
                    border: mainImage === img ? "2px solid #a81d24" : "1px solid #ddd",
                    overflow: "hidden",
                    background: "#fff"
                  }}
                >
                  <Image src={img} alt="" width={86} height={96} />
                </div>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div style={{ width: "100%" }}>
              <div
                style={{
                  height: "clamp(280px, 60vw, 500px)",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#fff"
                }}
              >
                <Image
                  src={mainImage}
                  alt="main"
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* MOBILE THUMBNAILS */}
              <div className="d-md-none d-flex gap-2 mt-2 overflow-auto pb-2">
                {thumbnails.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImage(img)}
                    style={{
                      width: 72,
                      height: 72,
                      minWidth: 72,
                      borderRadius: 6,
                      border: mainImage === img ? "2px solid #a81d24" : "1px solid #ddd",
                      cursor: "pointer",
                      overflow: "hidden",
                      background: "#fff"
                    }}
                  >
                    <Image src={img} alt="" width={72} height={72} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-md-6 mt-3 mt-md-0">

            <h5>{product.productTitle}</h5>

            <div className="mt-2">
              Rs. {activeSku?.price ?? product.isPrice}
            </div>

            {/* COLOR */}
            <div className="mt-4">
              <p>COLOR</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {colors.map(c => {
                  const disabled = !validColorsForSize.includes(c.color);
                  return (
                    <div
                      key={c.color}
                      onClick={() => !disabled && setSelectedColor(c.color)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: c.hexCode,
                        opacity: disabled ? 0.3 : 1,
                        outline: selectedColor === c.color ? "2px solid #a81d24" : "none",
                        cursor: disabled ? "not-allowed" : "pointer"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* SIZE */}
            {sizes.length > 0 && (
              <div className="mt-3">
                <p>SIZE</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {sizes.map(size => {
                    const skuForSize = skus.find(
                      s => s.color === selectedColor && s.size === size
                    );
                    const disabled = !validSizesForColor.includes(size);
                    return (
                      <button
                        key={size}
                        disabled={disabled}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: "8px 12px",
                          border:
                            selectedSize === size
                              ? "2px solid #a81d24"
                              : "1px solid #ddd",
                          opacity: disabled ? 0.4 : 1,
                          position: "relative"
                        }}
                      >
                        {size}
                        {skuForSize && (
                          <span style={{ fontSize: 10, display: "block" }}>
                            {skuForSize.stock} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-4">
              <Button onClick={() => setQty(q => Math.max(1, q - 1))}>-</Button>
              {qty}
              <Button onClick={() => setQty(q => q + 1)}>+</Button>
            </div>

            {/* BUTTONS */}
            <div className="mt-4 row g-3">
              <div className="col-12 col-sm-6">
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  className="primary-bg-clr"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </div>
              <div className="col-12 col-sm-6">
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FavoriteBorderIcon />}
                  style={{
                    
                    textTransform: "none",
                    fontSize: 15,
                    color: "#000000",
                    border: "1px solid #000000",
                  }}
                >
                  Wishlist
                </Button>
              </div>
            </div>

            {/* DESCRIPTION */}
             <div className="mt-5">
              <h5 className="fw-bold">Product Details</h5>

              <div className="mt-3 p-4 secondary-bg-clr">
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: product?.description || "" }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

/* ---------- STATIC ---------- */

export async function getStaticPaths() {
  const products = (await getAllProducts()) || [];
  return {
    paths: products.map(p => ({
      params: { slug: `${p.id}-${slugify(p.productTitle)}` }
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const productId = params.slug.split("-").slice(0, 5).join("-");
  const products = (await getAllProducts()) || [];
  const categories = (await getAllCategories()) || [];
  
  const product = products.find(p => p.id === productId);
  if (!product) return { notFound: true };
  return { props: { product, categories }, revalidate: 60 };
}
