import { Check, PriorityHigh } from "@mui/icons-material";
import { Box } from "@mui/material";

const typeLabels: Record<string, string> = {
  validation: 'validación',
  extraction: 'extracción'
};

export const StatusRender = (value: string | number | null | undefined) => {
  const val = String(value ?? "ok").toLowerCase();
  if (["ok"].includes(val)) {
    return (
      <Box
        sx={{
          background: "#b1feb3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 8px",
          borderRadius: "12px",
        }}
      >
        <Check sx={{ width: 16, color: "#37b03d" }} />
      </Box>
    );
  }
  if (["error", "validation", "extraction"].includes(val)) {
    return (
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
        <Box
          sx={{
            background: "#ffd9d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px 8px",
            borderRadius: "12px",
            marginRight: 1
          }}
        >
          <PriorityHigh sx={{ width: 16, color: "#ff7f7f" }} />
        </Box>
        {["validation", "extraction"].includes(val) && `Error en ${typeLabels[val]}`}
      </Box>
    );
  }

  return val;
};
