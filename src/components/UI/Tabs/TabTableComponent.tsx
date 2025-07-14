import { Box, Icon, Tab, Tabs, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomTabPanel from "../../core/CustomTabPanel";
import { TabTableComponentProps } from "../../../config/interfaces";
import { removeTab, useAppDispatch, useAppSelector } from "../../../store";
import CloseIcon from "@mui/icons-material/Close";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";

function TabTableComponent({
  tabs = [],
  initialTabIndex = 0,
}: TabTableComponentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dynamicTabs = useAppSelector((state) => state.tabs.dynamicTabs);
  const realInitialIndex = initialTabIndex ?? 0;
  const [selectedTab, setSelectedTab] = useState(realInitialIndex);
  const params = useParams();
  const { method, type } = params; 

  useEffect(() => {
    setSelectedTab(initialTabIndex);
  }, [initialTabIndex, dynamicTabs]);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    const selectedTabItem = tabs[newIndex];
    setSelectedTab(newIndex);

    if (selectedTabItem?.route) {
      navigate(`/${selectedTabItem.route}`);
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
        navigate(`/${method}/${type}`);
      }
    } else if (selectedTab > index) {
      setSelectedTab((prev) => prev - 1);
    }
  };

  const iconAction = (index: number) => {
    if (index === 1 || index === 0) return undefined;
    return (
      <CloseIcon
        onClick={(e) => {
          e.stopPropagation();
          closeTab(index);
        }}
        sx={{
          position: "relative",
          top: -12,
          fontSize: 12,
          right: -4,
        }}
      />
    );
  };

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
      <Box
        sx={{
          overflowX: "auto",
          borderBottom: 1,
          borderColor: "divider",
          overflowY: "hidden",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="inherit"
          sx={{
            minHeight: "40px",
            "& .MuiTabs-scroller": { overflowX: "auto", overflowY: "hidden" },
            "& .MuiTab-root": { minHeight: "40px" },
            "& .Mui-selected": {
              color: "primary.main",
              fontWeight: "bold",
              backgroundColor: "primary.light",
            },
          }}
        >
          {tabs.map((tab, index) => {
            const isTemplate = tab.origin === "categories" ? true : false;
            return (
              <Tab
                key={`tab-${index}`}
                label={
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    gap={2}
                  >
                    <Icon
                      fontSize="small"
                      sx={{ color: isTemplate ? "inherit" : "transparent" }}
                    >
                      <DeveloperBoardIcon />
                    </Icon>

                    <Typography
                      variant="body2"
                      noWrap
                    >
                      {tab.label}
                    </Typography>
                    <Icon>{iconAction(index)}</Icon>
                  </Box>
                }
                value={index}
                sx={{
                  minWidth: "160px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  textOverflow: "ellipsis",
                  borderTopRightRadius: 12,
                  borderTopLeftRadius: 12,
                }}
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Contenido de la Tab */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: "100%", overflow: "auto" }}>
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
    </Box>
  );
}

export default TabTableComponent;
