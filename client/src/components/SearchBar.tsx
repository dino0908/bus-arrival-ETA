import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ placeholder }) {
  return (
    <Paper
      variant="outlined"
      sx={{ display: "flex", alignItems: "center", px: 1.5, py: 0.5, borderRadius: 2, gap: 1 }}
    >
      <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
      <InputBase placeholder={placeholder} sx={{ flex: 1, fontSize: 13 }} />
    </Paper>
  );
}

export default SearchBar