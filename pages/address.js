import { useState, useRef } from "react";
import StoreLayout from "@/components/layout/Layout";
import InputField from "../components/generic/InputField";
import { useRouter } from "next/router";
import Link from "next/link";



export default function ConfirmAddress() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    addressType: "Home",
  });

  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  function handleChange(e) {
    let { name, value } = e.target;

    // Allow only digits for mobile + limit 10 digits
    if (name === "mobile") {
      value = value.replace(/[^0-9]/g, "").slice(0, 10);
    }

    setData({ ...data, [name]: value });
  }

  function validateForm() {
    let errors = {};

    // Required fields
    if (!data.name.trim()) errors.name = true;
    if (!data.mobile.trim()) errors.mobile = true;

    // Mobile length check
    if (data.mobile && data.mobile.length !== 10) errors.mobile = true;

    return errors;
  }

  function handleSave() {
    setSubmitted(true);
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      // Scroll to first error input
      const firstErrorField = Object.keys(errors)[0];
      const el = formRef.current.querySelector(`[name='${firstErrorField}']`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    console.log("Form Submitted", data);
  }

  const errors = validateForm();
  const isValid = Object.keys(errors).length === 0;

  return (
    <StoreLayout>
      <div className="container py-4" ref={formRef}>
        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-8 col-12">
            <div className="border p-4 rounded bg-white">
              <h6 className="fw-bold mb-3" style={{ fontSize: "15px" }}>
                CONTACT DETAILS
              </h6>

              <InputField
                label="Name"
                required
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter Name"
                showError={submitted && errors.name}
              />

              <InputField
                label="Mobile No"
                required
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                showError={submitted && errors.mobile}
              />

              {/* ADDRESS SECTION */}
              <h6 className="fw-bold mt-4 mb-3" style={{ fontSize: "15px" }}>
                ADDRESS
              </h6>

              <InputField
                label="Pin Code"
                name="pincode"
                value={data.pincode}
                onChange={handleChange}
                placeholder="Enter Pin Code"
              />

              <InputField
                label="Address (House no, Building , Street, Area)"
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="Address"
              />

              <div
                style={{
                  fontSize: "12px",
                  color: "#FEA045",
                  marginTop: "-8px",
                  marginBottom: "10px",
                }}
              >
                Please update flat/house no and society/apartment details
              </div>

              <InputField
                label="Locality/Town"
                name="locality"
                value={data.locality}
                onChange={handleChange}
                placeholder="Locality"
              />

              <div className="row">
                <div className="col-6">
                  <InputField
                    label="City/District"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    placeholder="City/District"
                  />
                </div>
                <div className="col-6">
                  <InputField
                    label="State"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
              </div>

              {/* ADDRESS TYPE */}
              <h6 className="fw-bold mt-3" style={{ fontSize: "15px" }}>
                ADDRESS TYPE
              </h6>

              <div className="d-flex align-items-center gap-4 mb-4 mt-2">
                <label className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="addressType"
                    value="Home"
                    checked={data.addressType === "Home"}
                    onChange={handleChange}
                  />
                  Home
                </label>

                <label className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="addressType"
                    value="Office"
                    checked={data.addressType === "Office"}
                    onChange={handleChange}
                  />
                  Office
                </label>
              </div>
              <div className="d-flex gap-2">
              <button className="btn btn-light w-100 mb-2" style={{ height: "45px" }}>
                Cancel
              </button>

              <button
                className="btn text-white w-100"
                style={{
                  background: "#800020" ,
                  height: "45px",
                  cursor: "pointer" ,
                }}
               
                onClick={handleSave}
              >
                Save
              </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — PRICE DETAILS */}
          <div className="col-lg-4 col-12">
            <div
              className="p-3 bg-white border rounded"
              style={{ position: "sticky", top: "100px" }}
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

                <Link href={"/payment"}>
              <button
                className="btn w-100 text-white"
                style={{
                  background: "#800020",
                  padding: "10px",
                  fontWeight: "600",
                }}
                
              >
                Continue
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
