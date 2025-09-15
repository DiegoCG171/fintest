import { Box, Select, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useMemo } from "react";
import { CollectionCase } from "../../../config/interfaces/collections.interface";
import { updateDependsOnId } from "../../../store/slices/UI/form/formBuilder.slice";

interface Props {
  tabId: string;
  testCaseId: string;
}

export const DependsOnInput = ({ tabId, testCaseId }: Props) => {
  const dispatch = useAppDispatch();
  const { collections } = useAppSelector((state) => state.collections);
  const dependsOnId = useAppSelector(
  (state) => state.formBuilder.tabForms[tabId]?.dependsOnId || ""
);

  const matchedCollection = useMemo(() => {
    return collections?.find((col) =>
      col.cases?.some((c: CollectionCase) => c.uuid === testCaseId)
    );
  }, [collections, testCaseId]);

  return (
    <Box sx={{ mb: 2 }}>
      <Select
        sx={{
          fontSize: "0.75rem",
          height: "28px",
          borderRadius: 2,
          "& .MuiSelect-select": {
            padding: "4px 8px",
          },
        }}
        value={dependsOnId}
        onChange={(e) =>
          dispatch(updateDependsOnId({ tabId, dependsOnId: e.target.value }))
        }
        displayEmpty
      >
        <MenuItem value="" sx={{ fontSize: "0.75rem" }}>
          <em>Selecciona un caso de prueba</em>
        </MenuItem>
        {matchedCollection?.cases
          ?.filter((c: CollectionCase) => c.uuid !== testCaseId)
          .map((c: CollectionCase) => (
            <MenuItem key={c.uuid} value={c.uuid} sx={{ fontSize: "0.75rem" }}>
              {c.name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};
