import { Box, Typography } from "@mui/material";
import { type NextBusType } from "../types/BusTypes";
import { etaMins } from "../util/util";

const LOAD: Record<string, { label: string; color: string }> = {
  SEA: { label: "Seats avail", color: "#16a34a" },
  SDA: { label: "Standing", color: "#d97706" },
  LSD: { label: "Ltd standing", color: "#dc2626" },
};

function EtaCell({ bus, label }: { bus: NextBusType; label: string }) {
  const mins = etaMins(bus.EstimatedArrival);   
  const load = LOAD[bus.Load];
  const eta = mins === null ? "–" : mins === 0 ? "Arr" : `${mins}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        minWidth: 64,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.58rem",
          fontWeight: 600,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: "text.disabled",
          mb: 0.35,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.25 }}>
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
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
              fontSize: "0.6rem",
              color: "text.secondary",
              mb: "1px",
            }}
          >
            min
          </Typography>
        )}
      </Box>
      {mins !== null && (
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.35, mt: 0.25 }}
        >
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: load.color,
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.58rem",
              fontWeight: 500,
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

export default EtaCell