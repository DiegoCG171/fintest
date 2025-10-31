import { Box, Select, MenuItem, InputLabel } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useMemo } from "react";
import { CollectionCase } from "../../../config/interfaces/collections.interface";
import { updateDependsOnId } from "../../../store/slices/UI/form/formBuilder.slice";

interface Props {
  tabId: string;
  testCaseId: string;
  dependsOn?: string
}

export const DependsOnInput = ({ tabId, testCaseId, dependsOn }: Props) => {
  const dispatch = useAppDispatch();
  const { collections } = useAppSelector((state) => state.collections);
  const dependsOnIdState = useAppSelector(
    (state) => state.formBuilder.tabForms[tabId]?.dependsOnId || ""
  );

  useEffect(() => {
    if (dependsOn && !dependsOnIdState) {
      dispatch(updateDependsOnId({ tabId, dependsOnId: dependsOn }));
    }
  }, [dependsOn, dependsOnIdState, tabId, dispatch]);

  const matchedCollection = useMemo(() => {
    return collections?.find((col) =>
      col.cases?.some((c: CollectionCase) => c.uuid === testCaseId)
    );
  }, [collections, testCaseId]);

  return (
    <Box
      sx={{
        mb: 2,
        width: {
          xs: "100%", 
          sm: "100%",
          md: "30%", 
        },
        display: "flex",
        alignItems: "baseline",
        gap: 1,
      }}
    >
      <InputLabel
        id="dependsOnd"
        sx={{
          fontSize: "0.9rem",
        }}
      >
        Selecciona el Caso de Prueba:
      </InputLabel>
      <Select
        labelId="dependsOnd"
        sx={{
          flex: 1,
          fontSize: "0.75rem",
          height: "28px",
          borderRadius: 2,
          "& .MuiSelect-select": {
            padding: "4px 8px",
          },
        }}
        value={dependsOnIdState}
        onChange={(e) =>
          dispatch(updateDependsOnId({ tabId, dependsOnId: e.target.value }))
        }
        displayEmpty
      >
        <MenuItem
          value=""
          sx={{ fontSize: "0.75rem" }}
        >
          <em>...</em>
        </MenuItem>
        {matchedCollection?.cases
          ?.filter((c: CollectionCase) => c.uuid !== testCaseId)
          .map((c: CollectionCase) => (
            <MenuItem
              key={c.uuid}
              value={c.uuid}
              sx={{ fontSize: "0.75rem" }}
            >
              {c.name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};
