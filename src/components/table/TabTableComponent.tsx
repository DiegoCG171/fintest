import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabTableComponentProps {
  tabs: TabItem[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tab-panel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ marginTop: 3 }}>{children}</Box>}
    </div>
  );
}

function TabTableComponent({ tabs }: TabTableComponentProps) {
  const [value, setValue] = useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: tabs.length >= 3 ? "flex" : "block",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={value}
        variant= "standard"
        textColor="inherit"
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index+'-tab-chip'}
            label={tab.label}
            value={index}
          />
        ))}
      </Tabs>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {tabs.map((tab, index) => (
          <CustomTabPanel
            key={index + '-tab-content'}
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
