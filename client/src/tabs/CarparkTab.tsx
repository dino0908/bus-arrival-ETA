import Box from "@mui/material/Box";
import LeftPanel from "../components/LeftPanel";
import Map from "../components/Map";

function CarparkTab() {

  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <LeftPanel title="Carparks" searchPlaceholder="Search carpark name or ID…">
        <> </> 
        {/* map carpark data here  */}
      </LeftPanel>

      {/* Right: map */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Map label="Carpark map" />
      </Box>
    </Box>
  );
}

export default CarparkTab