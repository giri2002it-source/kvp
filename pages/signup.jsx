import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import StoreLayout from "@/components/layout/Layout";
import AuthInput from "@/components/auth/AuthInput";

// MUI icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { userRegistration } from "@/services/login-services";

export default function SignupPage() {
  const router = useRouter();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    // Mobile: digits only, max 10
    if (name === "mobile") {
      const numeric = value.replace(/[^0-9]/g, "").slice(0, 10);
      setForm((s) => ({ ...s, mobile: numeric }));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const errs = {};

    if (!form.name.trim()) errs.name = "Name is required";

    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      errs.mobile = "Mobile must be 10 digits";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) errs.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword.trim()) {
      errs.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
  }

  function scrollToFirstError(errs) {
    const keys = Object.keys(errs);
    if (keys.length === 0) return;
    const first = keys[0];
    const el = formRef.current.querySelector(`#${first}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSubmit(e) {
    
    e.preventDefault();
    setSubmitted(true);

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      scrollToFirstError(errs);
      return;
    }
    console.log(form, 'jjjj')
    const data = {
  "firstName": form.name,
  "lastName": "",
  "email": form.email,
  "token": form.password
}
    const signup = userRegistration(data)
    
    router.push("/");
  }

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <StoreLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-12">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3 text-center" style={{ color: "#800020" }}>Create an account</h4>

              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <AuthInput
                  id="name"
                  name="name"
                  label="Full Name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  error={submitted && errors.name ? errors.name : ""}
                  icon={<PersonOutlineIcon />}
                />

                <AuthInput
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                  error={submitted && errors.mobile ? errors.mobile : ""}
                  icon={<PhoneIphoneOutlinedIcon />}
                  maxLength={10}
                />

                <AuthInput
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  error={submitted && errors.email ? errors.email : ""}
                  icon={<EmailOutlinedIcon />}
                />

                <AuthInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  error={submitted && errors.password ? errors.password : ""}
                  icon={<LockOutlinedIcon />}
                />

                <AuthInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  error={submitted && errors.confirmPassword ? errors.confirmPassword : ""}
                  icon={<LockOutlinedIcon />}
                />

                <button
                  type="submit"
                  className="btn w-100 text-white"
                  style={{
                    background: isFormValid ? "#800020" : "#999",
                    height: "45px",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                    fontWeight: 600,
                  }}
                  // disabled={!isFormValid}
                >
                  Create Account
                </button>
              </form>

              <div className="text-center mt-3">
                <span style={{ fontSize: 14 }}>Already have an account? </span>
                <a href="/login" style={{ color: "#800020", textDecoration: "none", fontWeight: 600 }}>Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
