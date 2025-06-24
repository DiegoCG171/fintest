import ReactJson, { InteractionProps } from "react-json-view";
import { setJsonTemplate } from "../../../store/slices/UI/form/jsonTemplateDraft.slice";
import { useAppDispatch, useAppSelector } from "../../../store";

function FormJSON() {
  const dispatch = useAppDispatch();
  const jsonData = useAppSelector((state)=> state.jsonTemplate.data);

  const handleEdit = (edit: InteractionProps) => {
    dispatch(setJsonTemplate(edit.updated_src as typeof jsonData));
    return true;
  };

  const handleAdd = (add: InteractionProps) => {
    dispatch(setJsonTemplate(add.updated_src as typeof jsonData));
    return true;
  };

  const handleDelete = (del: InteractionProps) => {
    dispatch(setJsonTemplate(del.updated_src as typeof jsonData));
    return true;
  };

  return (
    <div style={{ all: "initial" }}>
      <ReactJson
        src={jsonData}
        name="data"
        onEdit={handleEdit}
        onAdd={handleAdd}
        onDelete={handleDelete}
        displayDataTypes={false}
        enableClipboard={false}
        quotesOnKeys={false}
        theme="chalk"
        style={{
          borderRadius: "4px",
          fontSize: "0.6rem",
          height: "55vh",
          overflowY: "auto",
          padding: 16,
        }}
      />
    </div>
  );
}


export default FormJSON;
