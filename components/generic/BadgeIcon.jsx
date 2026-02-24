// components/common/BadgeIcon.jsx

import React from "react";

export default function BadgeIcon({ count, children, color = "#d4c392" }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {children}

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "6px",
            right: "-5px",
            background: color,
            color: "black",
            fontSize: "12px",
            minWidth: "18px",
            height: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            fontWeight: "600",
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
