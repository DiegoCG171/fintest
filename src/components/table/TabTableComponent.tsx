import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import CustomTabPanel from "../core/CustomTabPanel";
import { TabTableComponentProps } from "../../config/interfaces";

function TabTableComponent({
  tabs = [],
  initialTabIndex = 0,
}: TabTableComponentProps) {
  const [value, setValue] = useState(initialTabIndex);

  const variants = tabs.length >= 3 ? "fullWidth" : "standard";
  const display = tabs.length >= 3 ? "block" : "inline-flex";
  useEffect(() => {
    setValue(initialTabIndex);
  }, [initialTabIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "block",
        flexDirection: "column",
      }}
    >
        <Stack>
            
        </Stack>
      <Tabs
        value={value}
        variant={variants}
        textColor="inherit"
        onChange={handleChange}
        sx={{
          border: "1px solid #D1D1D1",
          borderRadius: 4,
          margin: 0,
          minHeight: 4,
          display: { display },
          "& .MuiTabs-indicator": {
            display: "none",
          },
          ...(tabs.length > 2 && {
            '& .MuiTabs-scroller': {
                marginBottom: '-6px !important',
            },
            '& .MuiTabs-root': {
                marginBottom: '-6px !important',
            },
        }),
        }}
      >
        {tabs?.map((tab, index) => (
          <Tab
            key={index + "-tab-table"}
            label={tab.label}
            value={index}
            sx={{
              minWidth: "20vw",
              padding: "0 64px",
              minHeight: "36px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              margin: 1,
              textTransform: "capitalize",
              textOverflow: "ellipsis",
              "&.Mui-selected": {
                color: "primary.main",
                fontWeight: "bold",
                backgroundColor: "primary.light",
              },
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {tabs?.map((tab, index) => (
          <CustomTabPanel
            key={index + "-tab-content"}
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

export default TabTableComponent;
