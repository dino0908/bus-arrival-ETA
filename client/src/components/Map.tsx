import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Map({ label }) {
  return (
    <Box sx={{ flex: 1, bgcolor: "#e9ecf0", position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute", inset: 0, opacity: 0.35,
          backgroundImage:
            "linear-gradient(rgba(100,110,130,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(100,110,130,.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <Box
        sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          bgcolor: "background.paper", border: "1px solid", borderColor: "divider",
          borderRadius: 1, px: 2, py: 0.75,
        }}
      >
        <Typography variant="caption" color="text.secondary">{label}</Typography>
      </Box>
    </Box>
  );
}

export default Map