import { useEffect, useState } from "react";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../core/CustomTabPanel";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { TabTableComponentProps } from "../../config/interfaces";


function TabbedTableForm({
  tabs,
  initialTabIndex = 0,
}: TabTableComponentProps) {
  const [value, setValue] = useState(initialTabIndex);
  useEffect(() => {
    setValue(initialTabIndex);
  }, [initialTabIndex]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100%",
        flexDirection: "column",
        mt: -2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          variant="standard"
          textColor="inherit"
          indicatorColor="primary"
          onChange={handleChange}
          sx={{
            maxHeight: "16px",
            padding: 0,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index + "-tab-chip"}
              label={tab.label}
              value={index}
              sx={{
                minHeight: "66px",
                padding: "4px 12px",
                fontSize: "12px",
                "&.Mui-selected": {
                  color: "primary.main",
                  fontWeight: "bold",
                },
              }}
            />
          ))}
        </Tabs>
        <Button startIcon={<SaveOutlinedIcon />} sx={{paddingX: 2, fontSize: "12px",}}>Guardar</Button>
      </Stack>

      <Box sx={{ flexGrow: 1, overflow: "auto", mt: -2 }}>
        {tabs.map((tab, index) => (
          <CustomTabPanel
            key={index + "-tab-form-content"}
            value={value}
            index={index}
          >
            {tab.content}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}
export default TabbedTableForm;
