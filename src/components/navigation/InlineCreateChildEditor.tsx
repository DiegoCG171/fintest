import { Box, Stack } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { InlineCreateChildEditorProps } from "../../config/interfaces";

export default function InlineCreateChildEditor({
    depth,
    item,
    renderCreateChildEditor,
    }: InlineCreateChildEditorProps) {
    return (
        <Box
        sx={{
            pl: (depth + 1) * 0.25,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            border: "2px solid transparent",
            p: 1,
            m: 0.5,
        }}
        >
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
        >
            <FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            {typeof renderCreateChildEditor === "function" && renderCreateChildEditor(item)}
        </Stack>
        </Box>
    );
}
