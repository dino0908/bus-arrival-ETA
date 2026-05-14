import { Box } from "@mui/material";
import Map from "../components/Map";
import LeftPanel from "../components/LeftPanel";

function BusTab() {
  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <LeftPanel title="Bus stops" searchPlaceholder="Search stop number or name…">
        <> {/* map bus service information */} </>
      </LeftPanel>

      {/* Right: map */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Map label="Bus stops map" />
      </Box>
    </Box>
  );
}

export default BusTab;