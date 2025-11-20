import { createTheme } from "@mui/material/styles";

// Design tokens: colors, typography, spacing
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f172a", // deep navy for a professional look
    },
    secondary: {
      main: "#0B5FFF", // modern blue accent for actions
    },
    background: {
      default: "#F7F9FB",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          padding: "10px 18px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(12, 21, 36, 0.08)",
        },
      },
    },
  },
});

export default theme;
