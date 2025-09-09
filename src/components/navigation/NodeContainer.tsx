import { Box } from "@mui/material";
import { ReactNode } from "react";

interface NodeContainerProps {
    depth: number;
    children: ReactNode;
}

export default function NodeContainer({ depth, children }: NodeContainerProps) {
    return (
        <Box
        sx={{
            width: "100%",
            pl: depth * 0.25,
            my: 1,
            opacity: 0,
            animation: "fadeIn 0.3s ease-in forwards",
            "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(0)" },
            to: { opacity: 1, transform: "translateY(0)" },
            },
        }}
        >
        {children}
        </Box>
    );
}
