import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";

function Navbar( { tab, setTab }: { tab: string, setTab: (value: string) => void }) {
    
  const TABS = [
    {
      value: "bus",
      label: "Bus ETA",
      icon: <DirectionsBusIcon fontSize="small" />,
    },
    {
      value: "carpark",
      label: "Carpark",
      icon: <LocalParkingIcon fontSize="small" />,
    },
    {
      value: "traffic",
      label: "Traffic",
      icon: <TrafficIcon fontSize="small" />,
    },
  ];
  return (
    <AppBar
      position="static"
      elevation={0}
      color="default"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 50, px: 2.5, gap: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 3.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
            }}
          />
          <Typography variant="subtitle1">SG Live</Typography>
        </Box>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            flex: 1,
            "& .MuiTabs-indicator": { height: 2 },
            "& .MuiTab-root": {
              minHeight: 50,
              textTransform: "none",
              fontSize: 13,
              fontWeight: 400,
              px: 2,
            },
            "& .Mui-selected": { fontWeight: 500 },
          }}
        >
          {TABS.map(({ value, label, icon }) => (
            <Tab
              key={value}
              value={value}
              label={label}
              icon={icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
