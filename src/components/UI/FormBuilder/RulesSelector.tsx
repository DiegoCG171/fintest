import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector, getRulesThunk } from "../../../store";

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


  // carga inicial
  useEffect(() => {
    if (allRulles.length === 0) {
      dispatch(getRulesThunk(1));
    } 
  }, [dispatch, allRulles.length]);

  useEffect(() => {
    if (!ruleSelected || allRulles.length === 0) return;

    const foundByMongoId = allRulles.find((r) => r._id === ruleSelected);
    const foundByUuid = allRulles.find((r) => r.uuid === ruleSelected);

    if (!foundByMongoId && !foundByUuid && hasMore && !loading) {
      dispatch(getRulesThunk(page + 1));
    }
  }, [ruleSelected, allRulles, dispatch, hasMore, loading, page]);

  // scroll infinito
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 50;

    if (isBottom && hasMore && !loading) {
      dispatch(getRulesThunk(page + 1));
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        p: 4,
        height: "55vh",
        borderRadius: 2,
      }}
    >
      <Typography sx={{ mb: 1, fontSize: "14px", fontWeight: "bold" }}>
        Selecciona una regla: <span style={{ color: "red" }}>*</span>
      </Typography>
      {showError && (
        <Typography sx={{ color: "red", fontSize: "12px", mb: 2}}>
          Debes seleccionar una regla.
        </Typography>
      )}

      <Box
        sx={{
          height: "40vh",
          overflowY: "auto",
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: "1px solid #D1D1D1",
        }}
        onScroll={handleScroll}
      >
        {allRulles.map((rule) => {
          const isSelected =
            rule._id === ruleSelected || rule.uuid === ruleSelected;

          return (
            <Box
              key={rule._id}
              onClick={() => {
                onSelectRule(rule._id);
                setShowError(false);
              }}
              sx={{
                p: 1,
                fontSize: 12,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                backgroundColor: isSelected
                  ? "rgba(25,118,210,0.15)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isSelected
                    ? "rgba(25,118,210,0.25)"
                    : "#e3f2fd",
                },
              }}
            >
              {rule.uuid} (v{rule.version})
            </Box>
          );
        })}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RulesSelector;
