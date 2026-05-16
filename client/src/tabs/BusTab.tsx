import { useEffect, useState } from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
import Map from "../components/Map";
import LeftPanel from "../components/LeftPanel";
import BusServiceCard from "../components/BusServiceCard";
import { useBus } from "../hooks/useBus";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import {
  type Service,
  type RenderType,
  type BusStopType,
} from "../types/BusTypes";
import { useGeolocation } from "../hooks/useGeoLocation";
import busStopsData from "../data/busStops.json";
import { getDistanceFromLatLonInKm } from "../util/util";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function BusTab() {
  const [busStopNumber, setBusStopNumber] = useState("");
  const { data: services, isLoading, error } = useBus(busStopNumber);
  const [renderType, setRenderType] = useState<RenderType>("SINGLE_STOP");
  const [searchCount, setSearchCount] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { position } = useGeolocation();
  const [nearbyStops, setNearbyStops] = useState<BusStopType[]>([]);

  useEffect(() => {
    if (!position?.latitude || !position?.longitude) return;

    const userLat = position.latitude;
    const userLng = position.longitude;
    const MAX_DISTANCE_KM = 0.5;

    const closeStops = busStopsData.value
      .map((stop) => {
        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLng,
          stop.Latitude,
          stop.Longitude,
        );
        return { ...stop, distance }; // Append the distance to the stop object
      })
      .filter((stop) => stop.distance <= MAX_DISTANCE_KM) // Only keep stops within 500m
      .sort((a, b) => a.distance - b.distance) // Sort closest to furthest
      .slice(0, 5); // Limit to top 5 closest stops

    setNearbyStops(closeStops);
  }, [position]);

  const handleSearch = (val: string) => {
    setBusStopNumber(val);
    setRenderType("SINGLE_STOP");
    setSearchCount((prev) => prev + 1);
  };

  const handleViewRoute = (service: Service) => {
    setRenderType("ROUTE_VIEW");
    setSelectedService(service);
  };

  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
      <LeftPanel
        title="Bus stops"
        searchPlaceholder="Search stop number or name…"
        onSearch={(val) => handleSearch(val)}
        error={error}
        isLoading={isLoading}
      >
        {/* Nearby stops section */}
        {position?.latitude && position?.longitude && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 1.5,
                mb: 1,
              }}
            >
              <MyLocationIcon sx={{ fontSize: 16, color: "primary.main" }} />
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "text.secondary",
                  lineHeight: 1,
                }}
              >
                Nearby Stops
              </Typography>
            </Box>

            {nearbyStops?.map((busStop: BusStopType) => (
              <Box
                key={busStop.BusStopCode}
                onClick={() => setBusStopNumber(busStop.BusStopCode)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  mb: 0.5,
                  borderRadius: "10px",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <DirectionsBusIcon sx={{ fontSize: 18, color: "white" }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, lineHeight: 1.3, mb: 0.25 }}
                    noWrap
                  >
                    {busStop.Description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                    noWrap
                  >
                    Stop {busStop.BusStopCode} · {busStop.RoadName}
                  </Typography>
                </Box>
                <Chip
                  label={`${Math.round(busStop.distance * 1000)}m`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    backgroundColor: "action.selected",
                    color: "text.secondary",
                    flexShrink: 0,
                  }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Divider between nearby and search results */}
        {position?.latitude && position?.longitude && busStopNumber && (
          <Divider sx={{ my: 1.5 }} />
        )}

        {/* Section header for searched stop */}
        {busStopNumber && services && services.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 1.5,
              mb: 1,
            }}
          >
            <DirectionsBusIcon sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography
              variant="overline"
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "text.secondary",
                lineHeight: 1,
              }}
            >
              Stop {busStopNumber}
            </Typography>
          </Box>
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
      <Map
        renderType={renderType}
        busStopNumber={busStopNumber}
        searchCount={searchCount}
        selectedService={selectedService}
      />
    </Box>
  );
}

export default BusTab;
