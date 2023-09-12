import { Box, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 2000,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
