import { useMemo } from "react";
import {
  EntityType,
  RouteType,
  TableColumn,
} from "../interfaces/tableSettings.interface";
import { columnsSettingsConfig } from "../mock/columnSettingsConfig";

export const useTableColumns = (
  pathname: RouteType
): TableColumn<EntityType>[] | null => {
  return useMemo(() => {
    switch (pathname) {
      case "/settings/users":
        return columnsSettingsConfig[
          "/settings/users"
        ] as TableColumn<EntityType>[];

      case "/settings/institutions":
        return columnsSettingsConfig[
          "/settings/institutions"
        ] as TableColumn<EntityType>[];

      case "/settings/roles":
        return columnsSettingsConfig[
          "/settings/roles"
        ] as TableColumn<EntityType>[];

      case "/settings/permissions":
        return columnsSettingsConfig[
          "/settings/permissions"
        ] as TableColumn<EntityType>[];
      case "/settings/rule":
        return columnsSettingsConfig[
          "/settings/rule"
        ] as TableColumn<EntityType>[];
      default:
        return null;
    }
  }, [pathname]);
};
