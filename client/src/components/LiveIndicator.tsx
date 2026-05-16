import { Box, Typography } from "@mui/material"

function LiveIndicator() {
    return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: "rgba(46, 125, 50, 0.1)",
            color: "success.main",
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
                bgcolor: "success.main",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "success.main",
              }}
            />
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
            Live
          </Typography>
        </Box>
    )
}

export default LiveIndicator