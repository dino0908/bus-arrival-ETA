import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Map from "../components/Map";
import LeftPanel from "../components/LeftPanel";
import BusServiceCard from "../components/BusServiceCard";
import { useBus } from "../hooks/useBus";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { type Service, type RenderType } from "../types/BusTypes";
import { useGeolocation } from "../hooks/useGeoLocation";

function BusTab() {
  const [busStopNumber, setBusStopNumber] = useState("");
  const { data: services, isLoading, error } = useBus(busStopNumber);
  const [renderType, setRenderType] = useState<RenderType>("SINGLE_STOP")
  const [searchCount, setSearchCount] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { position } = useGeolocation()

  const handleSearch = (val: string) => {
    setBusStopNumber(val);
    setRenderType("SINGLE_STOP")
    setSearchCount((prev) => prev+1)
  };

  const handleViewRoute = (service: Service) => {
    setRenderType("ROUTE_VIEW")
    setSelectedService(service)
  }



  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <LeftPanel
        title="Bus stops"
        searchPlaceholder="Search stop number or name…"
        onSearch={(val) => handleSearch(val)}
      >
        {position?.latitude && position?.longitude && (
    <Box 
      sx={{ 
        padding: '16px', 
        borderRadius: '8px',
        marginBottom: '16px'
      }}
    >
      <p style={{ margin: '0', fontSize: '1.3rem', color: '#666' }}>
        Bus Stops Near You
      </p>
      
    </Box>
  )}

  {/* Your existing debug coordinate display (optional, can be removed) */}
  {position && (
    <h1 style={{ fontSize: '1rem', color: '#ccc' }}>
      {position.latitude} {position.longitude}
    </h1>
  )}
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
            onViewRoute={() => handleViewRoute(service)}
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
        <Map renderType={renderType} busStopNumber={busStopNumber} searchCount={searchCount} selectedService={selectedService}/>
      </Box>
    </Box>
  );
}

export default BusTab;