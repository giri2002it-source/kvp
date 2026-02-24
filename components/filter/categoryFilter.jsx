
import { useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Chip,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function CategoryFilters() {
  // Collapse open/close
  const [open, setOpen] = useState({
    price: false,
    fabric: false,
    color: false,
    discount: false,
  });

  // Options per section
  const FILTERS = {
    price: ["Under ₹500", "₹500 – ₹1000", "₹1000 – ₹2000", "Above ₹2000"],
    fabric: ["Cotton", "Linen", "Silk", "Polyester", "Rayon"],
    color: ["Black", "White", "Blue", "Red", "Green", "Beige"],
    discount: ["10%+", "25%+", "40%+", "60%+"],
  };

  // Selected values per section
  const [selected, setSelected] = useState({
    price: [],
    fabric: [],
    color: [],
    discount: [],
  });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (section, value) => {
    setSelected((prev) => {
      const exists = prev[section].includes(value);
      const nextValues = exists
        ? prev[section].filter((v) => v !== value)
        : [...prev[section], value];

      return { ...prev, [section]: nextValues };
    });
  };

  const clearSection = (section) => {
    setSelected((prev) => ({ ...prev, [section]: [] }));
  };

  // (Optional) get aggregate filters to pass upwards
  // You can lift this state via props or context
  const getActiveFilters = () => selected;

  return (
    <Box
      sx={{
        width: "240px",
        background: "#f8f4e8", // beige tone to match the reference
        padding: "16px",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "1px",
            flexGrow: 1,
          }}
          className="primary-text-clr"
        >
          FILTER BY
        </Typography>
        <FilterListIcon sx={{ fontSize: "18px", color: "#333" }} />
      </Box>

      {/* Filter Rows */}
      {[
        { key: "price", title: "Price" },
        { key: "fabric", title: "Fabric" },
        { key: "color", title: "Color" },
        { key: "discount", title: "Discount" },
      ].map((item) => {
        const count = selected[item.key]?.length || 0;
        return (
          <Box
            key={item.key}
            sx={{
              borderBottom: "1px solid #ccc",
              py: 1,
              cursor: "pointer",
            }}
          >
            {/* Row header */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onClick={() => toggle(item.key)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "14px", fontWeight:600 }}>{item.title}</Typography>
                {count > 0 && (
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "12px",
                      backgroundColor: "#e6dfcc",
                      "& .MuiChip-label": { px: 0.5 },
                    }}
                  />
                )}
              </Box>
              <IconButton size="small" onClick={() => toggle(item.key)}>
                <ExpandMoreIcon
                  sx={{
                    transform: open[item.key] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.2s",
                  }}
                />
              </IconButton>
            </Box>

            {/* Submenu */}
            <Collapse in={open[item.key]}>
              <Box sx={{ pt: 1, fontSize: "14px" }}>
                <FormGroup>
                  {FILTERS[item.key].map((opt) => (
                    <FormControlLabel
                      key={opt}
                      control={
                        <Checkbox
                          size="small"
                          checked={selected[item.key].includes(opt)}
                          onChange={() => handleSelect(item.key, opt)}
                        />
                      }
                      label={opt}
                      sx={{
                        ".MuiFormControlLabel-label": { fontSize: "14px" },
                      }}
                    />
                  ))}
                </FormGroup>

                {/* Selected preview pills (optional, inline) */}
                {selected[item.key].length > 0 && (
                  <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected[item.key].map((val) => (
                      <Chip
                        key={val}
                        label={val}
                        size="small"
                        onDelete={() => handleSelect(item.key, val)}
                        sx={{ backgroundColor: "#efe8d4" }}
                      />
                    ))}
                  </Box>
                )}

                {/* Actions */}
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => clearSection(item.key)}
                    sx={{ textTransform: "none", color: "#8B0000", px: 0 }}
                  >
                    Clear
                  </Button>
                  {/* Example: you can wire this to trigger filtering */}
                  {/* <Button
                    variant="text"
                    size="small"
                    onClick={() => console.log(getActiveFilters())}
                    sx={{ textTransform: "none", color: "#333", px: 0 }}
                  >
                    Apply
                  </Button> */}
                </Box>
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}
