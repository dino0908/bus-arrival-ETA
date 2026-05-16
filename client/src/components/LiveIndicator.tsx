import { Box, Typography } from "@mui/material";
import { useHealthCheck } from "../hooks/useHealthCheck";

function LiveIndicator() {
  const isLive = useHealthCheck();
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        bgcolor: isLive ? "rgba(46, 125, 50, 0.1)" : "rgba(211, 47, 47, 0.1)",
        color: isLive ? "success.main" : "error.main",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: isLive ? "success.main" : "error.main",
          }}
        />
        
        {isLive && (
          <Box
            sx={{
              position: "absolute",
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "success.main",
              animation: "pulse 2s infinite ease-in-out",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)", opacity: 0.6 },
                "100%": { transform: "scale(3)", opacity: 0 },
              },
            }}
          />
        )}
      </Box>
      
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          fontSize: 11,
        }}
      >
        {isLive ? "Live" : "Offline"}
      </Typography>
    </Box>
  );
}

export default LiveIndicator;