import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
  TextField,
  Tab,
  Divider,
  ListItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { MessageTable } from "./MessageTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Add, MoreHoriz, Pause, Stop } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { onStopServer, starServer } from "../../store/server/serverSlice";
import {
  onSetTabsCollections,
  onToggleGeneralLoading,
  onToggleModalConfig,
  onToggleModalUpdate,
  onValidateSection,
} from "../../store/ui/uiSlice";
import { HeaderBar } from "../../components/Home/HeaderBar";
import { EventsTable } from "./EventsTable";
import { ModalMessage } from "./ModalMessage";
import { v4 as uuidV4 } from "uuid";
import { startGetAllTemplates } from "../../store/templates/templatesSlice";
import { ModalUpdateTemplate } from "./ModalUpdateTemplate";
import { startGetAllRules } from "../../store/rules/rulesSlice";

const cases = [
  {
    title: "Pruebas Ecommerce",
    icon: <FolderIcon sx={{ width: 12, fill: "#757575" }} />,
    subItems: [
      "Venta",
      "Reverso",
      "Venta",
      "Cancelación",
      "Venta con 3DS",
      "Venta Visa",
      "Venta con 3DS Mastercard",
    ],
  },
  {
    title: "Pruebas MOTO",
    icon: <FolderIcon sx={{ width: 12, fill: "#757575" }} />,
    subItems: ["Venta", "Reverso", "Venta", "Cancelación"],
  },
];

const menuItems = [
  {
    category: "Ecommerce",
    subItems: ["Venta", "Preauth", "PostAuth"],
  },
  {
    category: "MOTO",
    subItems: ["Venta"],
  },
];

const Simulator = () => {
  const dispatch: AppDispatch = useDispatch();

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openCasesIndex, setOpenCasesIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryCatalog, setSearchQueryCatalog] = useState<string>("");
  const [value, setValue] = useState("1");
  const [pause, setPause] = useState(false);

  const { message, messages } = useSelector(
    (state: RootState) => state.messages
  );

  const { status } = useSelector((state: RootState) => state.server);
  const { templates } = useSelector((state: RootState) => state.templates);
  const { generalLoading } = useSelector((state: RootState) => state.ui);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleMenuClick = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleCaseClick = (index: number) => {
    setOpenCasesIndex(openCasesIndex === index ? null : index);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchChangeCatalog = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQueryCatalog(event.target.value);
  };

  const filterCases = (query: string) => {
    return cases
      .map((caseItem, index) => {
        const titleMatch = caseItem.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const subItemsMatch = caseItem.subItems.some((subItem) =>
          subItem.toLowerCase().includes(query.toLowerCase())
        );

        if (titleMatch || subItemsMatch) {
          return {
            ...caseItem,
            index,
            show: titleMatch || subItemsMatch,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  const filteredCases = filterCases(searchQuery);

  const handleStarServer = () => {
    setPause(!pause);
    if (pause) {
      return;
    }
    dispatch(onValidateSection(false));
    dispatch(starServer());
  };

  const handleStopServer = () => {
    setPause(false);
    dispatch(onStopServer());
  };

  const handleChangeTabs = (subItem: string, item: string, uuid: string) => {
    dispatch(onSetTabsCollections({ subItem, item, uuid }));
  };

  useEffect(() => {
    dispatch(startGetAllTemplates());
    dispatch(startGetAllRules());
  }, []);

  return (
    <div>
      <HeaderBar />
      <div>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    height: "calc(100vh - 48px)",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 0.3rem",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    CATÁLOGO
                    <div>
                      <Add
                        sx={{ fontSize: "0.8rem", cursor: "pointer", mr: 0.5 }}
                        onClick={() => dispatch(onToggleModalConfig(true))}
                      />
                    </div>
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Buscar..."
                    size="small"
                    sx={{ width: 150, mb: 1, mt: 1 }} // reduce el ancho y los márgenes
                    inputProps={{
                      style: { fontSize: "0.6rem", padding: "6px 8px" },
                    }}
                    value={searchQueryCatalog}
                    onChange={handleSearchChangeCatalog}
                  />
                  <Divider />
                  <List sx={{ width: "100%" }}>
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <ListItemButton
                          sx={{ padding: "0px", pl: 2 }}
                          onClick={() => handleMenuClick(index)}
                        >
                          {openMenuIndex === index ? (
                            <ExpandLessIcon
                              sx={{ width: 12, fill: "#757575" }}
                            />
                          ) : (
                            <ExpandMoreIcon
                              sx={{ width: 12, fill: "#757575" }}
                            />
                          )}
                          <ListItemText
                            sx={{ ml: 1 }}
                            primary={item.category}
                            primaryTypographyProps={{ fontSize: "0.6rem" }}
                          />
                        </ListItemButton>
                        <Collapse in={openMenuIndex === index}>
                          <List component="div" disablePadding>
                            {templates.map((subItem, subIndex) => (
                              <ListItem
                                key={subIndex}
                                sx={{ p: 0, pl: 4 }}
                                secondaryAction={
                                  <MoreHoriz
                                    sx={{
                                      fontSize: 12,
                                      fill: "#757575",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      dispatch(
                                        onToggleModalUpdate({
                                          isOpen: true,
                                          template: subItem,
                                        })
                                      )
                                    }
                                  />
                                }
                              >
                                <ListItemIcon sx={{ ml: -1 }}>
                                  <DescriptionIcon
                                    sx={{ width: 12, fill: "#757575" }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{ ml: -5 }}
                                  primary={subItem.name}
                                  primaryTypographyProps={{
                                    fontSize: "0.6rem",
                                    color: "#353535",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "80px",
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </div>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    height: "calc(100vh - 112px)",
                    backgroundColor: "#f5f5f5",
                    padding: "16px 0.3rem",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    COLECCIONES
                    <div>
                      <Add
                        sx={{ fontSize: "0.8rem", cursor: "pointer", mr: 0.5 }}
                      />
                      <MoreHoriz
                        sx={{ fontSize: "0.8rem", cursor: "pointer" }}
                      />
                    </div>
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Buscar..."
                    size="small"
                    sx={{ width: 150, mb: 1, mx: "auto", mt: 1 }}
                    inputProps={{
                      style: { fontSize: "0.6rem", padding: "6px 8px" },
                    }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Divider />
                  <List sx={{ width: "100%", maxWidth: 360 }}>
                    {filteredCases.map((caseItem) => (
                      <div key={caseItem.index}>
                        <ListItemButton
                          sx={{ padding: 0 }}
                          onClick={() => handleCaseClick(caseItem.index)}
                        >
                          {openCasesIndex === caseItem.index ? (
                            <ExpandLessIcon
                              sx={{ width: 12, fill: "#1a1a1a" }}
                            />
                          ) : (
                            <ExpandMoreIcon
                              sx={{ width: 12, fill: "#1a1a1a" }}
                            />
                          )}
                          <ListItemIcon sx={{ ml: 1 }}>
                            {caseItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            sx={{ ml: -5 }}
                            primary={caseItem.title}
                            primaryTypographyProps={{ fontSize: "0.6rem" }}
                          />
                        </ListItemButton>
                        <Collapse in={openCasesIndex === caseItem.index}>
                          <List sx={{ pl: 0, pt: 0 }}>
                            {caseItem.subItems
                              .filter((subItem) =>
                                subItem
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              )
                              .map((subItem) => {
                                const uuid = uuidV4();

                                return (
                                  <ListItemButton
                                    key={uuid}
                                    sx={{ p: 0, pl: 2, pr: 1 }}
                                    onClick={() =>{
                                      dispatch(onToggleGeneralLoading(true))
                                      handleChangeTabs(
                                        subItem,
                                        caseItem.title,
                                        uuid
                                      )}
                                    }
                                  >
                                    <ListItemIcon sx={{ ml: 0.5 }}>
                                      <DescriptionIcon
                                        sx={{ width: 12, fill: "#757575" }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      sx={{ ml: -5, fontSize: 12 }}
                                      primary={subItem}
                                      primaryTypographyProps={{
                                        fontSize: "0.6rem",
                                        color: "#353535",
                                      }}
                                    />
                                    <MoreHoriz
                                      sx={{ fontSize: 12, fill: "#757575" }}
                                    />
                                  </ListItemButton>
                                );
                              })}
                          </List>
                        </Collapse>
                      </div>
                    ))}
                  </List>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#d3d3d3",
                    flexDirection: "column",
                    height: 64,
                    pt: 1,
                    pb: 1,
                  }}
                >
                  <div
                    style={{
                      height: 24,
                      fontSize: "0.6rem",
                      textAlign: "center",
                    }}
                  >
                    {status}
                  </div>
                  <Divider sx={{ width: "74%" }} />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      onClick={handleStarServer}
                      sx={{ mr: 0.5 }}
                      size="small"
                      aria-label="play/pause"
                    >
                      {pause ? (
                        <Pause sx={{ width: 18, height: 18 }} />
                      ) : (
                        <PlayArrowIcon sx={{ width: 18, height: 18 }} />
                      )}
                    </IconButton>
                    <IconButton
                      sx={{ mr: 0.5 }}
                      size="small"
                      aria-label="playAll"
                    >
                      <SkipNextIcon sx={{ width: 18, height: 18 }} />
                    </IconButton>
                    <IconButton
                      onClick={handleStopServer}
                      sx={{ mr: 0.5 }}
                      size="small"
                      aria-label="stop"
                    >
                      <Stop sx={{ width: 18, height: 18 }} />
                    </IconButton>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Box
              sx={{
                height: "calc(100vh - 48px)",
                backgroundColor: "#fafafa",
                display: "flex",
                flexDirection: "column",
                padding: 0,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ overflowY: "hidden" }}>
                <MessageTable data={message} />
              </Box>
              <div style={{ padding: 8 }}>
                <TabContext value={value}>
                  <Box sx={{ padding: 0, borderColor: "divider" }}>
                    <TabList
                      sx={{ minHeight: 20, padding: 0 }}
                      onChange={handleChange}
                    >
                      <Tab
                        sx={{
                          minHeight: 12,
                          minWidth: 0,
                          textAlign: "left",
                          padding: 1,
                          fontSize: "0.6rem",
                        }}
                        label="Eventos"
                        value="1"
                      />
                    </TabList>
                  </Box>
                  <TabPanel sx={{ padding: 0 }} value="1">
                    <EventsTable messages={messages} />
                  </TabPanel>
                </TabContext>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer }}
          open={generalLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ModalMessage />
        <ModalUpdateTemplate />
      </div>
    </div>
  );
};

export default Simulator;
