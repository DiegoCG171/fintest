import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <Paper
        component="form"
        sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 200,
            height: 36,
        }}
        onSubmit={(e) => e.preventDefault()}
        >
        <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 14 }}
            placeholder="Buscar"
            inputProps={{ "aria-label": "barra de búsqueda" }}
            onChange={searchData}
        />
        <IconButton
            type="submit"
            sx={{ p: "6px" }}
            aria-label="search"
        >
            <SearchIcon />
        </IconButton>
        </Paper>
    );
}

export default SearchBar;
