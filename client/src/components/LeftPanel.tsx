import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";

function LeftPanel({ title, searchPlaceholder, children }) {
  return (
    <Box
      sx={{
        width: "30%", minWidth: 0, flexShrink: 0,
        borderRight: "1px solid", borderColor: "divider",
        display: "flex", flexDirection: "column", overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ px: 2, pt: 1.75, pb: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography
          variant="overline"
          sx={{ fontSize: 11, letterSpacing: 0.8, color: "text.secondary", display: "block", mb: 1 }}
        >
          {title}
        </Typography>
        <SearchBar placeholder={searchPlaceholder} />
      </Box>
      <Box sx={{ overflowY: "auto", flex: 1 }}>{children}</Box>
    </Box>
  );
}

export default LeftPanel