import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import type { ReactNode } from "react";

interface LeftPanelProps {
  title: string;
  searchPlaceholder: string;
  children: ReactNode;
  onSearch: (value: string) => void;
  error?: Error | null;
  isLoading?: boolean;
  searchQuery?: string
}
function LeftPanel({
  title,
  searchPlaceholder,
  children,
  onSearch,
  error,
  isLoading,
  searchQuery
}: LeftPanelProps) {
  return (
    <Box
      sx={{
        width: "55%",
        minWidth: 0,
        flexShrink: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 2,
          pt: 1.75,
          pb: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: 11,
            letterSpacing: 0.8,
            color: "text.secondary",
            display: "block",
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <SearchBar
          placeholder={searchPlaceholder}
          onSearch={onSearch}
          isLoading={isLoading}
          value={searchQuery}
        />
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 1.5,
              color: "error.main",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Bus stop not found
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ overflowY: "auto", flex: 1 }}>{children}</Box>
    </Box>
  );
}

export default LeftPanel;
