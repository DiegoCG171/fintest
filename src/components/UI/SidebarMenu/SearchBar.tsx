import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { ChangeEvent, useState } from "react";

function SearchBar({
    onSearch,
    }: {
    onSearch: (value: string, searchOnItem: boolean) => void;
    }) {
    const [searchOnItem, setSearchOnItem] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value, searchOnItem);
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
            sx={{
            p: "6px",
            backgroundColor: !searchOnItem ? "primary.light" : "transparent",
            borderRadius: "6px",
            }}
            aria-label="search"
            onClick={() => {
            const newValue = !searchOnItem;
            setSearchOnItem(newValue);
            onSearch(inputValue, newValue);
            }}
        >
            {searchOnItem ? (
            <FolderOffOutlinedIcon />
            ) : (
            <FolderOutlinedIcon
                sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.light",
                }}
            />
            )}
        </IconButton>
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
