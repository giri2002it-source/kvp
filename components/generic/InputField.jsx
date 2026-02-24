import { useState } from "react";

export default function InputField({
  label,
  placeholder,
  required,
  type = "text",
  name,
  value,
  onChange,
  showError,
}) {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label" style={{ fontSize: "13px", fontWeight: 600 }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        className={`form-control ${showError ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          fontSize: "14px",
          padding: "10px",
          borderRadius: "6px",
        }}
      />

      {showError && (
        <div className="invalid-feedback">This field is required</div>
      )}
    </div>
  );
}
