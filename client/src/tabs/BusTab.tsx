import { Box } from "@mui/material";
import Map from "../components/Map";
import LeftPanel from "../components/LeftPanel";
import { useBus } from "../hooks/useBus";
import { useEffect, useState } from "react";

function BusTab() {
  const [busStopNumber, setBusStopNumber] = useState("")
  const { data, isLoading, error } = useBus(busStopNumber)

  const handleSearch = (val: string) => {
    setBusStopNumber(val)
  };

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <LeftPanel
        title="Bus stops"
        searchPlaceholder="Search stop number or name…"
        onSearch={(val) => handleSearch(val)}
      >
        <> {/* map bus service information */} </>
      </LeftPanel>

      {/* Right: map */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Map label="Bus stops map" />
      </Box>
    </Box>
  );
}

export default BusTab;
