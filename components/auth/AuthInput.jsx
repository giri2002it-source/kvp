import React from "react";

/**
 * AuthInput
 * Props:
 *  - id, name, type, label, value, onChange, placeholder, required, error (string)
 *  - icon (React node) optional: place a MUI icon component
 */
export default function AuthInput({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
  icon = null,
  maxLength,
}) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id || name} className="form-label" style={{ fontSize: 14, fontWeight: 600 }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-white" style={{ borderRight: "0" }}>
            {icon}
          </span>
        )}

        <input
          id={id || name}
          name={name}
          type={type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          style={{ borderLeft: icon ? "0" : undefined }}
        />
      </div>

      {error && <div className="invalid-feedback" style={{ display: "block" }}>{error}</div>}
    </div>
  );
}
