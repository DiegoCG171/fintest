import { Button } from "@mui/material";
import { useState } from "react";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { startUpdateTemplate } from "../../store/templates/templatesSlice";

export const JsonEditorUpdate = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalUpdateTemplate } = useSelector((state: RootState) => state.ui);
  const [{ _id, uuid, createdAt, updatedAt, __v, ...jsonData }, setJsonData] = useState(modalUpdateTemplate?.template);

  const handleEdit = (edit: any) => {
    setJsonData(edit.updated_src); // Actualiza los datos cuando se edita el JSON
  };

  const handleAdd = (add: any) => {
    setJsonData(add.updated_src); // Actualiza los datos cuando se agrega un nuevo valor
  };

  const handleDelete = (del: any) => {
    setJsonData(del.updated_src); // Actualiza los datos cuando se elimina un valor
  };

  const handleUpdateData = () => {
    dispatch(startUpdateTemplate({id: modalUpdateTemplate?.template._id, template: jsonData}))
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{marginBottom: 8}} >Actualizar Template</h2>
      <p style={{color: '#353535', fontSize: 12}}>Edita el contenido del template en formato JSON. Asegúrate de que los cambios cumplan con el formato y la estructura requerida antes de guardar.</p>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
        </div>
        <Button onClick={handleUpdateData} style={{height: '32px'}}  variant="contained" size="small">Actualizar</Button>
      </div>
      <p style={{ margin: 0, marginBottom: 12, fontSize: "0.7rem" }}>
        Contenido:
      </p>
      <ReactJson
        src={jsonData}
        onEdit={handleEdit}
        onAdd={handleAdd}
        onDelete={handleDelete}
        theme="twilight"
        displayObjectSize={false}
        displayDataTypes={false}
        iconStyle="triangle"
        quotesOnKeys={false}
        collapseStringsAfterLength={20}
        enableClipboard={false}
        name="data"
        style={{
          borderRadius: "4px",
          fontSize: "0.6rem",
          maxHeight: '55vh',
          overflowY: 'auto',
        }}
      />
    </div>
  );
};
