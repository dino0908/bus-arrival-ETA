import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useState } from "react";

function SearchBar({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        gap: 1,
      }}
    >
      <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
      <InputBase
        placeholder={placeholder}
        sx={{ flex: 1, fontSize: 13 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="contained"
        disableElevation
        onClick={() => onSearch(value)}
        startIcon={<SearchIcon />}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
          px: 3,
        }}
      >
        Search
      </Button>
    </Paper>
  );
}

export default SearchBar;
