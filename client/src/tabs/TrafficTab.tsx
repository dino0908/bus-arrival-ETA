import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";


function TrafficTab() {
  return (
    <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", bgcolor: "grey.50" }}>
      {/* Sub-header */}
      <Box
        sx={{
          px: 3, py: 1.5, bgcolor: "background.paper",
          borderBottom: "1px solid", borderColor: "divider",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="body2">Traffic cameras</Typography>
          <Typography variant="caption" color="text.secondary">
            Expressways &amp; major roads · Auto-refresh every 60 s
          </Typography>
        </Box>
        <Tooltip title="Refresh now">
          <IconButton size="small">
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Camera grid */}
      <Box
        sx={{
          flex: 1, overflowY: "auto", p: 2.5,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 1.5,
          alignContent: "start",
        }}
      >
        {/* map traffic data here */}
      </Box>
    </Box>
  );
}

export default TrafficTab