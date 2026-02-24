import StoreLayout from "@/components/layout/Layout";
import PrimaryButton from "@/components/generic/PrimaryButton";
import { useRouter } from "next/router";

// MUI ICONS
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function PaymentPage() {
  const router = useRouter();

  return (
    <StoreLayout>
      <div className="container py-4">
        <div className="row g-4">

          {/* LEFT SECTION — PAYMENT OPTIONS */}
          <div className="col-lg-8 col-12">
            <div className="border p-4 bg-white rounded">

              <h6 className="fw-bold mb-3" style={{ color: "#800020" }}>
                CHOOSE PAYMENT MODE
              </h6>

              {/* COD */}
              <button
                className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center gap-2"
                style={{ height: 45 }}
              >
                <LocalShippingIcon />
                Cash On Delivery
              </button>

              {/* UPI */}
              <div className="input-group mb-3">
                <span className="input-group-text bg-white">
                  <QrCodeScannerIcon />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="UPI (pay via any App)"
                  style={{ height: "45px" }}
                />
              </div>

              {/* CARD */}
              <button
                className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center gap-2"
                style={{ height: 45 }}
              >
                <CreditCardIcon />
                Credit/Debit Card
              </button>

              {/* Pay Later */}
              <button
                className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center gap-2"
                style={{ height: 45 }}
              >
                <AccessTimeIcon />
                Pay Later
              </button>

              {/* Wallets */}
              <button
                className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center gap-2"
                style={{ height: 45 }}
              >
                <AccountBalanceWalletIcon />
                Wallets
              </button>

              {/* EMI */}
              <button
                className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center gap-2"
                style={{ height: 45 }}
              >
                <BarChartIcon />
                EMI
              </button>

              {/* Net Banking */}
              <button
                className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center gap-2"
                style={{ height: 45 }}
              >
                <AccountBalanceIcon />
                Net Banking
              </button>

              {/* GIFT CARD */}
              <div className="d-flex justify-content-between align-items-center border p-2 rounded mt-3">
                <span>Have a Gift Card?</span>
                <span className="text-danger fw-semibold">APPLY GIFT CARD</span>
              </div>

            </div>
          </div>

          {/* RIGHT SECTION — PRICE DETAILS */}
          <div className="col-lg-4 col-12">
            <div
              className="p-3 bg-white border rounded"
              style={{
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

              <PrimaryButton
                text="PLACE ORDER"
                onClick={() => router.push("/order-success")}
              />
            </div>
          </div>

        </div>
      </div>
    </StoreLayout>
  );
}
