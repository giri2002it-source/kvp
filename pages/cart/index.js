import StoreLayout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import InputField from "@/components/generic/InputField"; 
import CheckoutPage from "@/pages/address";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showAddress, setShowAddress] = useState(false);

  // address fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  return (
    <StoreLayout>
      <div className="container py-4">
        {!showAddress && (
          <div className="row">
            {/* LEFT SIDE — CART ITEMS */}
            <div className="col-lg-8">
              {/* Top bar */}
              <div
                className="d-flex justify-content-between align-items-center mb-3 p-2"
                style={{
                  background: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "5px",
                }}
              >
                <span className="fw-semibold">{cart.length}/3 ITEMS SELECTED</span>

                <div className="d-flex gap-4">
                  <span className="text-danger" style={{ cursor: "pointer" }}>
                    MOVE TO WISHLIST
                  </span>
                  <span className="text-danger" style={{ cursor: "pointer" }}>
                    REMOVE
                  </span>
                </div>
              </div>

              {/* If cart empty */}
              {cart.length === 0 && <p className="text-muted">No items in cart</p>}

              {/* CART ITEMS LIST */}
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-3"
                  style={{
                    display: "flex",
                    background: "#fff7f2",
                    borderRadius: "6px",
                    border: "1px solid #f0d7c7",
                  }}
                >
                  {/* Checkbox */}
                  <input type="checkbox" className="me-3 mt-2" />

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    width={95}
                    height={120}
                    style={{ borderRadius: "6px", objectFit: "cover" }}
                  />

                  {/* Content */}
                  <div className="ms-3" style={{ flexGrow: 1 }}>
                    <h6 className="fw-semibold mb-1" style={{ fontSize: "15px" }}>
                      {item.title}
                    </h6>

                    <p className="mb-1 text-muted" style={{ fontSize: "13px" }}>
                      Sold by: Shagun sarees
                    </p>

                    {/* Price */}
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="fw-bold" style={{ fontSize: "17px", color: "#333" }}>
                        Rs. {item.price}
                      </span>

                      <span className="text-muted text-decoration-line-through" style={{ fontSize: "14px" }}>
                        Rs. 4599
                      </span>

                      <span style={{ color: "#ff7a00", fontSize: "14px" }}>(50% off)</span>
                    </div>

                    <p className="m-0" style={{ fontSize: "13px" }}>
                      Delivery by Tue Apr 29 | <span className="text-success"> Rs. 40 (Free)</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE — PRICE DETAILS */}
            <div className="col-lg-4">
              <div
                className="p-3"
                style={{
                  background: "#fff",
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h6 className="fw-semibold mb-3">PRICE DETAILS</h6>

                <div className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Price</span>
                    <span>Rs. 4999</span>
                  </div>

                  <div className="d-flex justify-content-between mb-1">
                    <span>Discount</span>
                    <span className="text-success">- Rs. 999</span>
                  </div>

                  <div className="d-flex justify-content-between mb-1">
                    <span>Delivery Charges</span>
                    <span className="text-success">Rs. 40 (Free)</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total Amount</span>
                  <span>Rs. 4000</span>
                </div>
                <Link href={'/address'}>
                <button
                  className="btn w-100 text-white primary-bg-clr"
                  style={{
                    fontWeight: "600",
                    padding: "10px",
                  }}
                 
                >
                  PROCESS TO CHECKOUT
                </button></Link>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- ADDRESS FORM ---------------- */}
        {/* {showAddress && (
          <CheckoutPage/>
        )} */}
      </div>
    </StoreLayout>
  );
}
