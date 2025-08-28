import { Box } from "@mui/material";
import ItemInlineEditor from "../core/ItemInlineEditor";

interface CreateNodeEditorProps {
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
  placeholder?: string;
}

function CreateNodeEditor({
  onSubmit,
  onCancel,
  placeholder = "Nombre de Categoría",
}: CreateNodeEditorProps) {
  return (
    <Box sx={{ pl: 1, mt: 0.5 }}>
      <ItemInlineEditor
        placeholder={placeholder}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Box>
  );
}
export default CreateNodeEditor;
