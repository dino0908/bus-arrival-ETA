import { Box, Typography } from "@mui/material";
import { type NextBusType } from "../types/BusTypes";
import { etaMins } from "../util/util";

const LOAD: Record<string, { label: string; color: string }> = {
  SEA: { label: "Seats avail", color: "#16a34a" },
  SDA: { label: "Standing",    color: "#d97706" },
  LSD: { label: "Ltd standing", color: "#dc2626" },
};

function EtaCell({ bus }: { bus: NextBusType }) {
  const mins = etaMins(bus.EstimatedArrival);
  const load = bus.Load ? LOAD[bus.Load] : null;
  const eta  = mins === null ? "–" : mins === 0 ? "Arr" : `${mins}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        width: "100%",
      }}
    >
      {/* ETA number */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.4 }}>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: "'DM Mono', monospace",
            color:
              mins === 0
                ? "#16a34a"
                : mins === null
                  ? "text.disabled"
                  : "text.primary",
          }}
        >
          {eta}
        </Typography>
        {mins !== null && mins > 0 && (
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "text.secondary",
              mb: "2px",
            }}
          >
            min
          </Typography>
        )}
      </Box>

      {/* Load indicator */}
      {mins !== null && load && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: load.color,
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: load.color,
              whiteSpace: "nowrap",
            }}
          >
            {load.label}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default EtaCell;