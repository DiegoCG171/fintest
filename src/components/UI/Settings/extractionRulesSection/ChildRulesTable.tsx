import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getRuleId, getStyleByLevel } from "../../../../config/utils/extractionRules.utils";
import { RuleRow } from "../../../../store/slices/extractionsRules/extractionRulesSlice";
import { CollapsibleRow } from "./CollapsibleRow";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

interface ChildRulesTableProps {
  row: RuleRow;
  level: number;
  maxLevel: number;
  childKey: "specification" | "breakingRules";
  styles: ReturnType<typeof getStyleByLevel>;
  onSubRuleUpdate: (index: number, updatedSubRule: RuleRow) => void;
  onAddSubRule?: (parentId: string) => void;
}

export const ChildRulesTable = ({
  row,
  level,
  maxLevel,
  childKey,
  styles,
  onSubRuleUpdate,
  onAddSubRule,
}: ChildRulesTableProps) => (
  <TableContainer sx={{ tableLayout: "fixed", width: "100%", borderRadius: 0, py: 2 }}>
    <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{ fontWeight: "bold", fontSize: styles.fontSize, pl: styles.marginLeft }}
          >
            Id
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: styles.fontSize }}>
            Nombre
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: styles.fontSize }}>
            Campo
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: styles.fontSize }}>
            Longitud
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {(row[childKey] || []).length > 0 ? (
          row[childKey]!.map((subRule, idx) => (
            <CollapsibleRow
              key={idx}
              row={subRule}
              level={level + 1}
              maxLevel={maxLevel}
              onUpdate={(updated) => onSubRuleUpdate(idx, updated)}
              onAddSubRule={onAddSubRule}
            />
          ))
        ) : (
          <TableRow />
        )}
        <TableRow>
          <TableCell
            sx={{
              color: "gray",
              fontStyle: "italic",
              fontSize: styles.fontSize,
              px: styles.marginLeft,
            }}
          >
            Id...
          </TableCell>
          <TableCell sx={{ color: "gray", fontStyle: "italic", fontSize: styles.fontSize }}>
            Nombre...
          </TableCell>
          <TableCell sx={{ color: "gray", fontStyle: "italic", fontSize: styles.fontSize }}>
            Campo...
          </TableCell>
          <TableCell sx={{ color: "gray", fontStyle: "italic", fontSize: styles.fontSize }}>
            Longitud...
          </TableCell>
          <TableCell align="center">
            <IconButton
              color="primary"
              size="small"
              onClick={() => onAddSubRule?.(getRuleId(row))}
            >
              <LibraryAddOutlinedIcon
                style={{
                  color: "gray",
                  fontSize: level === 1 ? 20 : 18,
                }}
              />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);