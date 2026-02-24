import StoreLayout from "@/components/layout/Layout";
import PrimaryButton from "@/components/generic/PrimaryButton";
import { useRouter } from "next/router";

// MUI Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <StoreLayout>
      <div className="container py-5 d-flex justify-content-center">
        <div className="bg-white border rounded p-4 p-md-5" style={{ maxWidth: 700, width: "100%" }}>

          {/* SUCCESS ICON */}
          <div className="text-center mb-3">
            <CheckCircleIcon style={{ fontSize: 80, color: "#800020" }} />
          </div>

          {/* THANK YOU MESSAGE */}
          <h3 className="text-center fw-bold" style={{ color: "#800020" }}>
            Thank You for Your Order!
          </h3>
          <p className="text-center text-muted mb-4">
            Your order has been successfully placed. Below are your order details.
          </p>

          {/* ORDER DETAILS CARD */}
          <div className="border rounded p-3 mb-4">

            {/* ORDER ID */}
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Order ID:</span>
              <span>#ORD123456</span>
            </div>

            {/* DATE */}
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Order Date:</span>
              <span>27 Nov 2025</span>
            </div>

            {/* ITEMS */}
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Items:</span>
              <span>2 Products</span>
            </div>

            {/* AMOUNT */}
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Total Paid:</span>
              <span>Rs. 4000</span>
            </div>
          </div>

          {/* PAYMENT CONFIRMATION */}
          <div className="border rounded p-3 mb-4">
            <h6 className="fw-semibold mb-3">Payment Confirmation</h6>

            <div className="d-flex align-items-center mb-2">
              <PaymentIcon className="me-2 text-success" />
              <span>Payment Received</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <LocalShippingIcon className="me-2 text-primary" />
              <span>Your order will be shipped soon</span>
            </div>

            <div className="d-flex align-items-center">
              <ShoppingBagIcon className="me-2 text-warning" />
              <span>Preparing your items</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="d-flex flex-column flex-md-row gap-3">
            {/* <PrimaryButton
              text="Track Order"
              onClick={() => router.push("/track-order")}
            /> */}
            <PrimaryButton
              text="Continue Shopping"
              onClick={() => router.push("/")}
              
            />
          </div>

        </div>
      </div>
    </StoreLayout>
  );
}
