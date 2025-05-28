import { Box, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTabPanel from "../../core/CustomTabPanel";
import { TabTableComponentProps } from "../../../config/interfaces";

function TabTableComponent({ tabs = [], initialTabIndex = 0 }: TabTableComponentProps) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(initialTabIndex);

  useEffect(() => {
    setSelectedTab(initialTabIndex);
  }, [initialTabIndex]);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
  setSelectedTab(newIndex);

  const selectedTabItem = tabs[newIndex];
  if (selectedTabItem?.route) {
    navigate(`/${selectedTabItem.route}`);
  }
};


  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header de Tabs */}
      <Box sx={{ overflowX: "auto", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="inherit"
          sx={{
            minHeight: "40px",
            "& .MuiTabs-scroller": { overflowX: "auto" },
            "& .MuiTab-root": { minHeight: "40px" },
            "& .Mui-selected": {
              color: "primary.main",
              fontWeight: "bold",
              backgroundColor: "primary.light",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`tab-${index}`}
              label={tab.label}
              value={index}
              sx={{
                minWidth: "160px",
                padding: "6px 12px",
                fontSize: "12px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                textOverflow: "ellipsis",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Contenido de la Tab */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {tabs.map((tab, index) => (
          <CustomTabPanel key={`tabpanel-${index}`} value={selectedTab} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default TabTableComponent;