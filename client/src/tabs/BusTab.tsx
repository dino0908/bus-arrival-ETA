import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Map from "../components/Map";
import LeftPanel from "../components/LeftPanel";
import BusServiceCard from "../components/BusServiceCard";
import { useBus } from "../hooks/useBus";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { type Service, type RenderType } from "../types/BusTypes";


function BusTab() {
  const [busStopNumber, setBusStopNumber] = useState("");
  const { data, isLoading, error } = useBus(busStopNumber);
  const [services, setServices] = useState<Service[] | null>(null);
  const [renderType, setRenderType] = useState<RenderType>("SINGLE_STOP")
  const [busStopCoords, setBusStopCoords] = useState(null)

  const handleSearch = (val: string) => {
    setBusStopNumber(val);
    setRenderType("SINGLE_STOP")
  };

  useEffect(() => {
    setServices(data?.data?.Services ?? null);
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <LeftPanel
        title="Bus stops"
        searchPlaceholder="Search stop number or name…"
        onSearch={(val) => handleSearch(val)}
      >
        {/* Empty / no-search state */}
        {!busStopNumber && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              py: 6,
              color: "text.disabled",
            }}
          >
            <DirectionsBusIcon sx={{ fontSize: 36 }} />
            <Typography variant="body2">
              Enter a bus stop number to see arrivals
            </Typography>
          </Box>
        )}

        {/* No results after a search */}
        {busStopNumber && services?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
              color: "text.disabled",
            }}
          >
            <Typography variant="body2">
              No services found for stop {busStopNumber}
            </Typography>
          </Box>
        )}

        {/* Service list */}
        {services?.map((service) => (
          <BusServiceCard
            key={service.ServiceNo}
            ServiceNo={service.ServiceNo}
            NextBus={service.NextBus}
            NextBus2={service.NextBus2}
          />
        ))}
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
        <Map renderType={renderType} busStopNumber={busStopNumber}/>
      </Box>
    </Box>
  );
}

export default BusTab;