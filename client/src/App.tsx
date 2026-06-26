import Box from "@mui/material/Box";
// import TrafficTab from "./tabs/TrafficTab";
// import CarparkTab from "./tabs/CarparkTab";
import BusTab from "./tabs/BusTab";
import { useState } from "react";
import Navbar from "./components/Navbar";

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
      <Navbar tab={tab} setTab={setTab} />
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
        {/* {tab === "carpark" && <CarparkTab />}
        {tab === "traffic" && <TrafficTab />} */}
      </Box>
    </Box>
  );
}
