import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { DynamicSettingTable } from "../../components/UI/Settings/DynamicSettingTable";
import { useState } from "react";
import { useAppSelector } from "../../store";
import { DynamicSettingForm } from "../../components/UI/Settings/DynamicSettingForm";
import PermissionGuard from "../../config/guards/PermissionGuard";
import { useSettingsButtonConfig } from "../../config/hooks/useSettingsButtonConfig";
import { useLoadSettingsData } from "../../config/hooks/useLoadSettingsData";
import { useLoadSecurityPermissionOptions } from "../../config/hooks/useLoadSecurityPermissionOptions";
import { useSettingsSearch } from "../../config/hooks/useSettingsSearch";
import { SettingsSearchBar } from "../../components/UI/Settings/SettingsSearchBar";
import { RulesEditPage } from "../../components/UI/Settings/extractionRulesSection/RulesEditPage";

export const SettingsPage = () => {
  const { formActive, extractionRulesActive } = useAppSelector(
    (state) => state.admin
  );
  const [searchValue, setSearchValue] = useState("");

  useLoadSettingsData();
  useLoadSecurityPermissionOptions();
  const buttonConfig = useSettingsButtonConfig();
  const { search } = useSettingsSearch();
  const Icon = buttonConfig.icon;
  const responsiveWidth = () => "calc(100vw - 300px)";

  const renderContent = () => {
    if (extractionRulesActive) {
      return <RulesEditPage />;
    }

    if (formActive) {
      return <DynamicSettingForm />;
    }

    return (
      <>
        <Stack direction="row" justifyContent="space-between">
          <SettingsSearchBar
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={() => search(searchValue)}
          />
          <PermissionGuard permissions={buttonConfig.requiredPermissions}>
            <Button
              variant="outlined"
              startIcon={<Icon />}
              onClick={buttonConfig.onClick}
            >
              {buttonConfig.text}
            </Button>
          </PermissionGuard>
        </Stack>
        <DynamicSettingTable />
      </>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Typography
        sx={{ marginLeft: 4, marginTop: 4, fontSize: 24, fontWeight: "bold" }}
      ></Typography>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          overflow: "hidden",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Card
          sx={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            minWidth: responsiveWidth(),
            maxWidth: responsiveWidth(),
            overflow: "hidden",
            p: 2,
          }}
        >
          {renderContent()}
        </Card>
      </Box>
    </Box>
  );
};
