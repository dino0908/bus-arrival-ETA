import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({
  placeholder,
  onSearch,
  isLoading,
  value
}: {
  placeholder: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
  value: string
}) {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && !isLoading) {
      onSearch(value)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onSearch(newValue); // Live search as user types
  };

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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Paper>
  );
}

export default SearchBar;
