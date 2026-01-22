import { Box, Icon, Tab, Tabs, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomTabPanel from "../../core/CustomTabPanel";
import { TabTableComponentProps } from "../../../config/interfaces";
import { removeTab, useAppDispatch, useAppSelector } from "../../../store";
import CloseIcon from "@mui/icons-material/Close";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";

function TabTableComponent({
  tabs = [],
  initialTabIndex = 0,
  actions = [],
}: TabTableComponentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dynamicTabs = useAppSelector((state) => state.tabs.dynamicTabs);
  const realInitialIndex = initialTabIndex ?? 0;
  const [selectedTab, setSelectedTab] = useState(realInitialIndex);
  const params = useParams();
  const { method, type, categoryId, caseId } = params;
  const baseRoute = categoryId
    ? `${method}/${type}/categories/${categoryId}`
    : `${method}/${type}/collections/${caseId}`;
  const location = useLocation();

  useEffect(() => {
    setSelectedTab(initialTabIndex);
  }, [initialTabIndex, dynamicTabs]);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    const selectedTabItem = tabs[newIndex];
    setSelectedTab(newIndex);

    if (selectedTabItem?.route) {
      navigate(`/${selectedTabItem.route}`);
    } else {
      const suffix = selectedTabItem.label.toLowerCase();

      if (suffix === "detalles" || suffix === "errores") {
        navigate(`/${method}/${type}/${suffix}`);
      } else {
        navigate(`/${baseRoute}/${suffix}`);
      }

      if (suffix === "detalles" || suffix === "errores") {
        navigate(`/${method}/${type}/${suffix}`);
      } else {
        navigate(`/${baseRoute}/${suffix}`);
      }
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedIndex = tabs.findIndex((tab) => {
      const suffix = tab.label.toLowerCase();
      if (tab.route) {
        return currentPath.endsWith(tab.route);
      }
      if (suffix === "detalles" || suffix === "errores") {
        return currentPath.endsWith(`/${suffix}`);
      }
      return currentPath.endsWith(`/${suffix}`);
    });

    if (matchedIndex !== -1 && matchedIndex !== selectedTab) {
      setSelectedTab(matchedIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, tabs]);

  const closeTab = (index: number) => {
    const tab = tabs[index];
    if (!tab.origin) return;
    if (!tab.route) return;

    dispatch(removeTab(tab.route));

    if (selectedTab === index) {
      const newIndex = index > 2 ? index - 1 : 0;
      setSelectedTab(newIndex);
      const navigateToTab = tabs[newIndex];
      if (navigateToTab?.route) {
        navigate(`/${navigateToTab.route}`);
      } else {
        const suffix = navigateToTab.label.toLowerCase();
        if (suffix === "detalles" || suffix === "errores") {
          navigate(`/${method}/${type}/${suffix}`);
        } else {
          navigate(`/${baseRoute}/${suffix}`);
        }
        if (suffix === "detalles" || suffix === "errores") {
          navigate(`/${method}/${type}/${suffix}`);
        } else {
          navigate(`/${baseRoute}/${suffix}`);
        }
      }
    } else if (selectedTab > index) {
      setSelectedTab((prev) => prev - 1);
    }
  };

  const iconAction = (index: number) => {
    if (!tabs[index]?.origin) return undefined;
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          overflow: "hidden",
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
            flexGrow: 1,
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
                  <Box display="flex" alignItems="flex-end" gap={2}>
                    <Icon
                      fontSize="small"
                      sx={{ color: isTemplate ? "inherit" : "transparent" }}
                    >
                      <DeveloperBoardIcon />
                    </Icon>

                    <Typography variant="body2" noWrap>
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
        {actions?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1,
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            {actions?.map((action, index) => (
              <Box key={index}>{action}</Box>
            ))}
          </Box>
        )}
      </Box>
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
