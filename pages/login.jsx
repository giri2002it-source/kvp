import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import StoreLayout from "@/components/layout/Layout";
import AuthInput from "@/components/auth/AuthInput";

// MUI Icons
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser } from "@/services/login-services";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    identifier: "", // email or mobile
    password: "",
    
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    // allow only digits for mobile-like input but we are storing identifier (mixed)
    if (name === "identifier") {
      // allow digits and @ and . and letters — just keep value (we'll validate)
      setForm((s) => ({ ...s, [name]: value }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  function validate() {
    const errs = {};

    const id = form.identifier.trim();
    if (!id) {
      errs.identifier = "Email or mobile is required";
    } else {
      const isDigits = /^\d+$/.test(id);
      if (isDigits) {
        // mobile number validation
        if (id.length !== 10) errs.identifier = "Mobile must be 10 digits";
      } else {
        // email validation
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(id)) errs.identifier = "Enter a valid email address";
      }
    }

    if (!form.password.trim()) errs.password = "Password is required";

    return errs;
  }

  function scrollToFirstError(errs) {
    const keys = Object.keys(errs);
    if (keys.length === 0) return;
    const first = keys[0];
    const el = formRef.current.querySelector(`#${first}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function handleSubmit (e) {
    e.preventDefault();
    setSubmitted(true);

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      scrollToFirstError(errs);
      return;
    }

    const loginRes = await loginUser(form);
    console.log(loginRes);

    // router.push("/");
  }

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <StoreLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5 col-12">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3 text-center" style={{ color: "#800020" }}>Login</h4>

              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <AuthInput
                  id="identifier"
                  name="identifier"
                  label="Email "
                  placeholder="Enter email "
                  value={form.identifier}
                  onChange={handleChange}
                  error={submitted && errors.identifier ? errors.identifier : ""}
                  icon={<EmailOutlinedIcon />}
                />

                <AuthInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  error={submitted && errors.password ? errors.password : ""}
                  icon={<LockOutlinedIcon />}
                />

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input me-1" /> Remember me
                    </label>
                  </div>

                  <div>
                    <a href="#" style={{ textDecoration: "none", color: "#800020" }}>Forgot?</a>
                  </div>
                </div>

                <button
                  id="loginBtn"
                  type="submit"
                  className="btn w-100 text-white"
                  style={{
                    background: isFormValid ? "#800020" : "#999",
                    height: "45px",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                    fontWeight: 600,
                  }}
                  disabled={!isFormValid}
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <span style={{ fontSize: 14 }}>Don't have an account? </span>
                <a href="/signup" style={{ color: "#800020", textDecoration: "none", fontWeight: 600 }}>Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
