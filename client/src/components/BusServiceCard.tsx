import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import RouteIcon from "@mui/icons-material/Route";
import { type BusServiceCardProps } from "../types/BusTypes";
import EtaCell from "./ETACell";

const DECK: Partial<Record<string, string>> = { SD: "Single", DD: "Double" };

export default function BusServiceCard({
  ServiceNo,
  NextBus,
  NextBus2,
  onViewRoute,
}: BusServiceCardProps) {
  const deck = DECK[NextBus.Type];
  const wab = NextBus.Feature === "WAB" || NextBus2.Feature === "WAB";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        alignItems: "stretch",
        borderBottom: "1px solid",
        borderColor: "divider",
        minHeight: 88,
        transition: "background-color 0.12s ease",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      {/* ── Col 1: Service number + meta ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: 2,
          py: 1.5,
          borderRight: "1px solid",
          borderColor: "divider",
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {ServiceNo}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          {deck && (
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "text.disabled",
                textTransform: "uppercase",
              }}
            >
              {deck}
            </Typography>
          )}
          {wab && (
            <Tooltip title="Wheelchair accessible" arrow placement="right">
              <AccessibleIcon sx={{ fontSize: 16, color: "primary.main" }} />
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* ── Col 2: ETAs + action ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          alignItems: "stretch",
        }}
      >
        {/* Next ETA */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 1.5,
            py: 1.5,
            gap: 0.4,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "text.disabled",
            }}
          >
            Next
          </Typography>
          <EtaCell bus={NextBus} />
        </Box>

        {/* After ETA */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 1.5,
            py: 1.5,
            gap: 0.4,
            borderLeft: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "text.disabled",
            }}
          >
            After
          </Typography>
          <EtaCell bus={NextBus2} />
        </Box>

        {/* Map button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 1.5,
            borderLeft: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tooltip title="View route on map" arrow>
            <Button
              onClick={onViewRoute}
              size="small"
              variant="outlined"
              startIcon={<RouteIcon sx={{ fontSize: "16px !important" }} />}
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: "8px",
                px: 1.25,
                py: 0.75,
                minWidth: 0,
                whiteSpace: "nowrap",
                color: "primary.main",
                borderColor: "primary.main",
                lineHeight: 1.2,
              }}
            >
              Route
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}