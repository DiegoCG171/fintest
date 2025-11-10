import {
  Autocomplete,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { getRulesThunk, useAppDispatch, useAppSelector } from "../../../store";

interface RulesSelectorProps {
  ruleSelected: string | null;
  onSelectRule: (id: string) => void;
  showError: boolean;
  setShowError: (value: boolean) => void;
}

function RulesSelector({
  ruleSelected,
  onSelectRule,
  showError,
  setShowError,
}: RulesSelectorProps) {
  const dispatch = useAppDispatch();
  const { allRulles, page, hasMore, status } = useAppSelector(
    (state) => state.allRules
  );
  const loading = status === "loading";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (allRulles.length === 0) {
      dispatch(getRulesThunk(1));
    }
  }, [dispatch, allRulles.length]);

  const selectedRule = useMemo(
    () =>
      allRulles.find(
        (r: { _id: string; uuid: string }) =>
          r._id === ruleSelected || r.uuid === ruleSelected
      ) ?? null,
    [allRulles, ruleSelected]
  );

  return (
    <FormControl fullWidth error={showError}>
      <Autocomplete
        disablePortal
        size="small"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={allRulles}
        value={selectedRule}
        loading={loading}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        getOptionLabel={(option) =>
          `${option.uuid || "Sin UUID"} (v${option.version})`
        }
        noOptionsText="No hay reglas disponibles"
        onChange={(_, newValue) => {
          if (newValue) {
            onSelectRule(newValue._id);
            setShowError(false);
          }
        }}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 200,
              overflowY: "auto",
              py: 0.5,
              "& li": { fontSize: 14 },
            },
            onScroll: (e: React.UIEvent<HTMLUListElement>) => {
              const target = e.currentTarget;
              const isBottom =
                target.scrollTop + target.clientHeight >=
                target.scrollHeight - 50;
              if (isBottom && hasMore && !loading) {
                dispatch(getRulesThunk(page + 1));
              }
            },
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Selecciona una regla"
            error={showError}
          />
        )}
      />
      {showError && (
        <FormHelperText>Debes seleccionar una regla.</FormHelperText>
      )}
    </FormControl>
  );
}

export default RulesSelector;