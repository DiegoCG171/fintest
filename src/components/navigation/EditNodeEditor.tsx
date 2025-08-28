import {
    ItemsServiceMenu,
    MenuServiceInterface,
} from "../../config/interfaces";
import ItemInlineEditor from "../core/ItemInlineEditor";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

interface EditNodeEditorProps {
    item: MenuServiceInterface | ItemsServiceMenu;
    onSubmit: (newName: string) => Promise<void>;
    onCancel: () => void;
    }

    function EditNodeEditor({ item, onSubmit, onCancel }: EditNodeEditorProps) {
    return (
        <ItemInlineEditor
        icon={
            <FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
        }
        initialValue={item.name}
        placeholder="Nuevo nombre"
        onSubmit={onSubmit}
        onCancel={onCancel}
        />
    );
}
export default EditNodeEditor;
