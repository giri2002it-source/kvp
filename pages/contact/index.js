import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert
} from "@mui/material";
import StoreLayout from "@/components/layout/Layout";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const onChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email";
    if (form.message.trim().length < 10)
      return "Message should be at least 10 characters";
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus(error);
      return;
    }

    // 🔹 Replace with API call later
    setStatus("success");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <StoreLayout>
      <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Have a question or need help? Send us a message and we’ll get back to you.
        </Typography>

        <Grid container spacing={4}>
          {/* FORM */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4 }}>
              {status && status !== "success" && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {status}
                </Alert>
              )}

              {status === "success" && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Thank you! We’ll get back to you shortly.
                </Alert>
              )}

              <Box component="form" onSubmit={onSubmit}>
                <TextField
                  label="Your Name"
                  value={form.name}
                  onChange={onChange("name")}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Message"
                  value={form.message}
                  onChange={onChange("message")}
                  multiline
                  minRows={5}
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                />

                <Button variant="contained" type="submit">
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* INFO */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Reach us directly
              </Typography>

              <Typography>
                📧 <a href="mailto:support@yourstore.com">support@yourstore.com</a>
              </Typography>

              <Typography mt={1}>
                📞 <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </Typography>

              <Typography mt={2} color="text.secondary">
                Support hours: Mon–Fri, 9:00 AM – 5:00 PM
              </Typography>

              <Box mt={3} display="flex" gap={2}>
                <a href="https://instagram.com/yourstore" target="_blank">Instagram</a>
                <a href="https://facebook.com/yourstore" target="_blank">Facebook</a>
                <a href="https://x.com/yourstore" target="_blank">X</a>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </StoreLayout>
  );
}
