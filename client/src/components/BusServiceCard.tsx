import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { type BusServiceCardProps } from "../types/BusTypes";
import EtaCell from "./ETACell";
import PublicIcon from "@mui/icons-material/Public";

const DECK: Partial<Record<string, string>> = { SD: "Single", DD: "Double" };

export default function BusServiceCard({
  ServiceNo,
  NextBus,
  NextBus2,
}: BusServiceCardProps) {
  const deck = DECK[NextBus.Type];
  const wab = NextBus.Feature === "WAB" || NextBus2.Feature === "WAB";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1.25,
        borderBottom: "1px solid",
        borderColor: "divider",
        gap: 2,
        transition: "background-color 0.12s ease",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.35 }}>
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {ServiceNo}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {deck && (
            <Typography
              sx={{
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "text.disabled",
                textTransform: "uppercase",
              }}
            >
              {deck} decker
            </Typography>
          )}
          {wab && (
            <Tooltip title="Wheelchair accessible" arrow placement="right">
              <AccessibleIcon sx={{ fontSize: 11, color: "primary.main" }} />
            </Tooltip>
          )}
        </Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
        <EtaCell bus={NextBus} label="Next" />
        <Box
          sx={{
            width: "1px",
            bgcolor: "divider",
            alignSelf: "stretch",
            my: "2px",
          }}
        />
        <EtaCell bus={NextBus2} label="After" />

        <Box // divider
          sx={{
            width: "1px",
            bgcolor: "divider",
            alignSelf: "stretch",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            alignSelf: "center",
          }}
        >
          <Tooltip title="View on Map" arrow>
            <IconButton
              size="small"
              onClick={() => console.log("Viewing service on map")}
              sx={{
                color: "primary.main",
                borderRadius: 1,
              }}
            >
              <PublicIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
