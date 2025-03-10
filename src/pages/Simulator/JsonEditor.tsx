import { Button } from "@mui/material";
import React, { useState } from "react";
import ReactJson from "react-json-view";
import { startCreateTemplate } from "../../store/templates/templatesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const JsonEditor: React.FC = () => {
  const  dispatch: AppDispatch = useDispatch()
  const [jsonData, setJsonData] = useState({
    name: "Venta Template",
    description: "Plantilla de una venta con su respuesta",
    validationTransaction: [
      {
        idBitmap: "HD-1",
        isRequired: true,
        function: "value",
        value: "ISO026000010",
      },
      {
        idBitmap: "HD-1.1",
        isRequired: true,
        function: "value",
        value: "ISO",
      },
      {
        idBitmap: "HD-1.2",
        isRequired: true,
        function: "value",
        value: "02",
      },
      {
        idBitmap: "HD-1.3",
        isRequired: true,
        function: "value",
        value: "60",
      },
      {
        idBitmap: "HD-1.4",
        isRequired: true,
        function: "value",
        value: "000",
      },
      {
        idBitmap: "HD-1.5",
        isRequired: true,
        function: "value",
        value: "1",
      },
      {
        idBitmap: "HD-1.6",
        isRequired: true,
        function: "value",
        value: "0",
      },
      {
        idBitmap: "HD-2",
        isRequired: true,
        function: "value",
        value: "0200",
      },
      {
        idBitmap: "HD-3",
        isRequired: true,
        function: "calculated",
        value: null,
      },
      {
        idBitmap: "DE-1",
        isRequired: true,
        function: "calculated",
        value: null,
      },
      {
        idBitmap: "DE-3",
        isRequired: true,
        function: "value",
        value: "001000",
      },
      {
        idBitmap: "DE-3.1",
        isRequired: true,
        function: "value",
        value: "00",
      },
      {
        idBitmap: "DE-3.2",
        isRequired: true,
        function: "value",
        value: "10",
      },
      {
        idBitmap: "DE-3.2",
        isRequired: true,
        function: "value",
        value: "00",
      },
      {
        idBitmap: "DE-4",
        isRequired: true,
        function: "value",
        value: "000000002000",
      },
      {
        idBitmap: "DE-7",
        isRequired: true,
        function: "systemTimeDate",
        value: "MMddHHmmss",
      },
      {
        idBitmap: "DE-11",
        isRequired: true,
        function: "randomDigits",
        value: null,
      },
      {
        idBitmap: "DE-12",
        isRequired: true,
        function: "systemTimeDate",
        value: "HHmmss",
      },
      {
        idBitmap: "DE-13",
        isRequired: true,
        function: "systemTimeDate",
        value: "MMdd",
      },
      {
        idBitmap: "DE-18",
        isRequired: true,
        function: "value",
        source: "merchant",
        value: "5399",
      },
      {
        idBitmap: "DE-22",
        isRequired: true,
        function: "value",
        source: "entryMode",
        value: "051",
      },
      {
        idBitmap: "DE-25",
        isRequired: true,
        function: "value",
        value: "10",
      },
      {
        idBitmap: "DE-32",
        isRequired: true,
        function: "randomDigits",
        value: null,
      },
      {
        idBitmap: "DE-35",
        isRequired: true,
        function: "value",
        value: "4517800552376379=25092010000000032800",
      },
      {
        idBitmap: "DE-37",
        isRequired: true,
        function: "randomDigits",
        value: null,
      },
      {
        idBitmap: "DE-41",
        isRequired: true,
        function: "randomDigits",
        value: null,
      },
      {
        idBitmap: "DE-42",
        isRequired: false,
        function: "randomDigits",
        value: null,
      },
      {
        idBitmap: "DE-43",
        isRequired: true,
        function: "value",
        value: "BANORTE               CD MEXICO    014MX",
      },
      {
        idBitmap: "DE-43.1",
        isRequired: true,
        function: "value",
        value: "BANORTE               ",
      },
      {
        idBitmap: "DE-43.2",
        isRequired: true,
        function: "value",
        value: "CD MEXICO    ",
      },
      {
        idBitmap: "DE-43.3",
        isRequired: true,
        function: "value",
        value: "014",
      },
      {
        idBitmap: "DE-43.4",
        isRequired: true,
        function: "value",
        value: "MX",
      },
      {
        idBitmap: "DE-48",
        isRequired: true,
        function: "randomDigits",
        value: null,
      },
      {
        idBitmap: "DE-49",
        isRequired: true,
        function: "value",
        value: "484",
        source: "currencyCode",
      },
      {
        idBitmap: "DE-60",
        isRequired: true,
        function: "value",
        value: "B062PRO1+0000000",
      },
      {
        idBitmap: "DE-61",
        isRequired: true,
        function: "value",
        value: "B475PRO100000000000",
      },
      {
        idBitmap: "DE-63",
        isRequired: true,
        function: "randomString",
        value: null,
      },
      {
        idBitmap: "DE-63.HDR",
        isRequired: true,
        function: "randomString",
        value: null,
      },
      {
        idBitmap: "DE-63.HDR.1",
        isRequired: true,
        function: "value",
        value: "&",
      },
      {
        idBitmap: "DE-63.HDR.2",
        isRequired: true,
        function: "value",
        value: " ",
      },
      {
        idBitmap: "DE-63.HDR.3",
        isRequired: true,
        function: "calculated",
        value: "00002",
      },
      {
        idBitmap: "DE-63.HDR.4",
        isRequired: true,
        function: "calculated",
        value: "00023",
      },
      {
        idBitmap: "DE-63.Q2",
        isRequired: true,
        function: "value",
        value: "! Q200002 03",
      },
      {
        idBitmap: "DE-63.Q2.1",
        isRequired: true,
        function: "value",
        value: "!",
      },
      {
        idBitmap: "DE-63.Q2.2",
        isRequired: true,
        function: "value",
        value: " ",
      },
      {
        idBitmap: "DE-63.Q2.3",
        isRequired: true,
        function: "value",
        value: "Q2",
      },
      {
        idBitmap: "DE-63.Q2.3",
        isRequired: true,
        function: "value",
        value: "00002",
      },
      {
        idBitmap: "DE-63.Q2.4",
        isRequired: true,
        function: "value",
        value: " ",
      },
      {
        idBitmap: "DE-63.Q2.6",
        isRequired: true,
        function: "value",
        value: "03",
        source: "accessMode",
      },
      {
        idBitmap: "DE-100",
        isRequired: true,
        function: "value",
        value: "03475",
      },
      {
        idBitmap: "DE-120",
        isRequired: true,
        function: "value",
        value: "032 ADDRESS TERMINAL EXAMPLE       ",
      },
      {
        idBitmap: "DE-121",
        isRequired: true,
        function: "value",
        value: "023                       ",
      },
      {
        idBitmap: "DE-123",
        isRequired: false,
        function: "value",
        value: "02000000000000000000000",
      },
      {
        idBitmap: "DE-125",
        isRequired: true,
        function: "value",
        value: "012PB2400000000",
      },
      {
        idBitmap: "DE-126",
        isRequired: true,
        function: "value",
        value: "038                                      ",
      },
    ],
    generationTransaction: [
      {
        idBitmap: "HD-1",
        function: "value",
        value: "ISO026000010",
      },
      {
        idBitmap: "HD-1.1",
        function: "value",
        value: "ISO",
      },
      {
        idBitmap: "HD-1.2",
        function: "value",
        value: "02",
      },
      {
        idBitmap: "HD-1.3",
        function: "value",
        value: "60",
      },
      {
        idBitmap: "HD-1.4",
        function: "value",
        value: "000",
      },
      {
        idBitmap: "HD-1.5",
        function: "value",
        value: "1",
      },
      {
        idBitmap: "HD-1.6",
        function: "value",
        value: "5",
      },
      {
        idBitmap: "HD-2",

        function: "value",
        value: "0210",
      },
      {
        idBitmap: "HD-3",
        function: "calculated",
        value: null,
      },
      {
        idBitmap: "DE-1",
        function: "calculated",
        value: null,
      },
      {
        idBitmap: "DE-3",
        function: "echo",
      },
      {
        idBitmap: "DE-3.1",
        function: "echo",
      },
      {
        idBitmap: "DE-3.2",
        function: "echo",
      },
      {
        idBitmap: "DE-3.2",
        function: "echo",
      },
      {
        idBitmap: "DE-4",
        function: "echo",
      },
      {
        idBitmap: "DE-7",
        function: "echo",
      },
      {
        idBitmap: "DE-11",
        function: "echo",
      },
      {
        idBitmap: "DE-12",
        function: "echo",
      },
      {
        idBitmap: "DE-13",
        function: "echo",
      },
      {
        idBitmap: "DE-18",
        function: "echo",
      },
      {
        idBitmap: "DE-22",
        function: "echo",
      },
      {
        idBitmap: "DE-25",
        function: "echo",
      },
      {
        idBitmap: "DE-32",
        function: "echo",
      },
      {
        idBitmap: "DE-35",
        function: "echo",
      },
      {
        idBitmap: "DE-37",
        function: "echo",
      },
      {
        idBitmap: "DE-38",
        function: "randomDigits",
      },
      {
        idBitmap: "DE-39",
        function: "value",
        source: "responseCode",
      },
      {
        idBitmap: "DE-41",
        function: "echo",
      },
      {
        idBitmap: "DE-42",
        function: "echo",
      },
      {
        idBitmap: "DE-48",
        function: "echo",
      },
      {
        idBitmap: "DE-49",
        function: "echo",
      },
      {
        idBitmap: "DE-60",
        function: "echo",
      },
      {
        idBitmap: "DE-61",
        function: "echo",
      },
      {
        idBitmap: "DE-63",
        function: "echo",
      },
      {
        idBitmap: "DE-63.HDR",
        function: "echo",
      },
      {
        idBitmap: "DE-63.HDR.1",
        function: "echo",
      },
      {
        idBitmap: "DE-63.HDR.2",
        function: "echo",
      },
      {
        idBitmap: "DE-63.HDR.3",
        function: "echo",
      },
      {
        idBitmap: "DE-63.HDR.4",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2.1",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2.2",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2.3",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2.3",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2.4",
        function: "echo",
      },
      {
        idBitmap: "DE-63.Q2.6",
        function: "echo",
      },
      {
        idBitmap: "DE-100",
        function: "echo",
      },
      {
        idBitmap: "DE-120",
        function: "echo",
      },
      {
        idBitmap: "DE-121",
        function: "echo",
      },
      {
        idBitmap: "DE-125",
        function: "echo",
      },
      {
        idBitmap: "DE-126",
        function: "echo",
      },
    ],
  });

  const handleEdit = (edit: any) => {
    setJsonData(edit.updated_src); // Actualiza los datos cuando se edita el JSON
  };

  const handleAdd = (add: any) => {
    setJsonData(add.updated_src); // Actualiza los datos cuando se agrega un nuevo valor
  };

  const handleDelete = (del: any) => {
    setJsonData(del.updated_src); // Actualiza los datos cuando se elimina un valor
  };

  const handleSaveData = () => {
    dispatch(startCreateTemplate(jsonData))
  }

  return (
    <div style={{ padding: "1rem" }}>
        <h2 style={{marginBottom: 8}} >Crear Nuevo Template</h2>
        <p style={{color: '#353535', fontSize: 12}}>Completa los campos necesarios para crear un nuevo template que podrás utilizar más adelante. Asegúrate de que toda la información esté correcta antes de guardar.</p>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          {/* <p style={{ margin: 0, fontSize: "0.6rem" }}>Nombre</p>
          <TextField
            size="small"
            sx={{ width: 150, mb: 2, mt: 1 }} // reduce el ancho y los márgenes
            inputProps={{
              style: { fontSize: "0.6rem", padding: "6px 8px" },
            }}
          /> */}
        </div>
        <Button onClick={handleSaveData} style={{height: '32px'}}  variant="contained" size="small">Guardar</Button>
      </div>
      <p style={{ margin: 0, marginBottom: 12, fontSize: "0.6rem" }}>
        Contenido:
      </p>
      <ReactJson
        src={jsonData}
        onEdit={handleEdit}
        onAdd={handleAdd}
        onDelete={handleDelete}
        theme="twilight"
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

export default JsonEditor;
