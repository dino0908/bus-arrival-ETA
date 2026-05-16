import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";
import TrafficTab from "./tabs/TrafficTab";
import CarparkTab from "./tabs/CarparkTab";
import BusTab from "./tabs/BusTab";
import { Typography } from "@mui/material";

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

export default function App() {
  const [tab, setTab] = useState("bus");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* ── Top navbar ── */}
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

      {/* ── Tab content ── */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {tab === "bus" && <BusTab />}
        {tab === "carpark" && <CarparkTab />}
        {tab === "traffic" && <TrafficTab />}
      </Box>
    </Box>
  );
}
