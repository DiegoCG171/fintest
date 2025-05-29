import { Box, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTabPanel from "../../core/CustomTabPanel";
import { TabTableComponentProps } from "../../../config/interfaces";
import { removeTab, useAppDispatch, useAppSelector } from "../../../store";
import CloseIcon from "@mui/icons-material/Close";

function TabTableComponent({
  tabs = [],
  initialTabIndex = 0,
}: TabTableComponentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dynamicTabs = useAppSelector((state) => state.tabs.dynamicTabs);
  const realInitialIndex = initialTabIndex ?? 0;
  const [selectedTab, setSelectedTab] = useState(realInitialIndex);

  useEffect(() => {
    setSelectedTab(initialTabIndex);
  }, [initialTabIndex, dynamicTabs]);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    const selectedTabItem = tabs[newIndex];
    setSelectedTab(newIndex);

    if (selectedTabItem?.route) {
      navigate(`/${selectedTabItem.route}`);
    } else {
      navigate("/main");
    }
  };

  const closeTab = (index: number) => {
  if (index === 0 || index === 1) return;

  const dynamicTab = dynamicTabs[index - 2];
  if (dynamicTab) {
    dispatch(removeTab(dynamicTab.route));
  }
  if (selectedTab === index) {
    const newIndex = index > 2 ? index - 1 : 0;
    setSelectedTab(newIndex);
    const navigateToTab = tabs[newIndex];
    if (navigateToTab?.route) {
      navigate(`/${navigateToTab.route}`);
    } else {
      navigate("/main");
    }
  } else if (selectedTab > index) {
    setSelectedTab((prev) => prev - 1);
  }
};


  const iconAction = (index: number) => {
    if(index === 1 || index === 0) return undefined;
    return (
      <CloseIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(index);
                  }}
                  fontSize="small"
                />
    )
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
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
              icon={iconAction(index)}
              iconPosition="end"
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
          <CustomTabPanel
            key={`tabpanel-${index}`}
            value={selectedTab}
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
