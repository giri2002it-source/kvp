import { Button } from "@mui/material";

export default function PrimaryButton({ text, onClick, disabled, style }) {
  return (
    <Button
      className="btn text-white w-100"
      style={{
        background: disabled ? "#999" : "#800020",
        height: "45px",
        fontWeight: "600",
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
