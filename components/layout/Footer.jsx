// components/layout/Footer.jsx
import React from "react";
import Link from "next/link";
import {
  WhatsApp,
  Instagram,
  Facebook,
  YouTube,
  LocationOn,
} from "@mui/icons-material";

const FOOTER_BG_COLOR = "#f5f0e3"; // beige
const TEXT_COLOR = "#333333";
const BRAND_COLOR = "#8b0000";     // deep red headings
const BORDER_COLOR = "#cfc7b3";    // subtle divider

const shopLinks = [
  { title: "Home", path: "/" },
  { title: "New Arrivals", path: "/products?tag=new" },
  { title: "Occasions", path: "/occasions" },
  { title: "Blog", path: "/blog" },
];

// You might want to add actual social media URLs here
const socialLinks = [
  { Icon: WhatsApp, url: "https://wa.me/your-number" },
  { Icon: Instagram, url: "https://instagram.com/your-profile" },
  { Icon: Facebook, url: "https://facebook.com/your-page" },
  { Icon: YouTube, url: "https://youtube.com/your-channel" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: FOOTER_BG_COLOR,
        color: TEXT_COLOR,
        marginTop: "2rem",
        borderTop: `1px solid ${BORDER_COLOR}`,
      }}
    >
      {/* Bootstrap container */}
      <div className="container py-4 py-lg-5">
        <div className="row align-items-start gy-4">
          {/* Column 1: Brand (wider) */}
          <div className="col-12 col-md-6 col-lg-5">
            <h3
              style={{
                color: BRAND_COLOR,
                fontWeight: 700,
                letterSpacing: "1px",
                marginBottom: "0.75rem",
              }}
            >
              Saree
            </h3>

            <p style={{ maxWidth: 520, marginBottom: "0.75rem" }}>
              sarees fashion is a minimalist style that emphasizes simplicity
              naturalness and calmness.
            </p>

            <div className="d-flex align-items-start" style={{ gap: "0.5rem" }}>
              <LocationOn style={{ fontSize: 20 }} />
              <p className="mb-0" style={{ maxWidth: 420 }}>
                Elampillai, Salem, Tamil Nadu – 637502
              </p>
            </div>
          </div>

          {/* Column 2: Connect With Us */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6
              style={{
                color: BRAND_COLOR,
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Connect With Us
            </h6>

            <div className="d-flex" style={{ gap: "0.5rem" }}>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: TEXT_COLOR }}
                >
                  <social.Icon style={{ fontSize: 18 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Shop */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6
              style={{
                color: BRAND_COLOR,
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Shop
            </h6>

            <ul className="list-unstyled mb-0">
              {shopLinks.map((link) => (
                <li key={link.title} className="mb-1">
                  <Link
                    href={link.path}
                    style={{
                      color: TEXT_COLOR,
                      textDecoration: "none",
                    }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6
              style={{
                color: BRAND_COLOR,
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Contact
            </h6>

            <p className="mb-1">Contact@outlook.com</p>
            <p className="mb-0">+1 (555) 876-5432</p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: `1px solid ${BORDER_COLOR}`,
          backgroundColor: "#f7f2e6",
        }}
      >
        <div className="container py-2">
          <div className="row">
            <div className="col-12 text-center">
              <small>
                © {new Date().getFullYear()} Sarees Fashion. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}