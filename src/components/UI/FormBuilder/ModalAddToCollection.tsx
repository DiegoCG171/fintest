import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import CategoriesTreeSelector from "./CategoriesTreeSelector";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ModalAddToCollectionProps } from "../../../config/interfaces";
import { createTestCaseThunk } from "../../../store/slices/collections/collections.thunk";

export const ModalAddToCollection = ({
  templateId = "",
}: ModalAddToCollectionProps) => {
  const dispatch = useAppDispatch();
  const [collection, setCollection] = useState<string>("");
  const [collectionError, setCollectionError] = useState<boolean>(false);
  const collectionsMenu = useAppSelector(
    (state) => state.sidebarMenu.collectionsMenu
  );


  const { loading } = useAppSelector((state) => state.modalForm);

  const handleSubmit = () => {
    if (!collection) {
      setCollectionError(true);
      return;
    }
    setCollectionError(false);
    console.log(collection)
    dispatch(
      createTestCaseThunk({
        id_collection: collection,
        id_template: templateId,
      })
    );
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontWeight: "bold",
          }}
        >
          Agregar a Colecciones
        </Typography>
        <Typography variant="body2" gutterBottom>
          Selecciona la colección en la que almacenarás el caso de prueba.
        </Typography>
        {collectionError && (
          <Typography variant="body2" gutterBottom color="error.main">
            Es necesario seleccionar una colección.
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={16} style={{ color: "#fff" }} />
              ) : (
                <SaveOutlinedIcon />
              )
            }
            sx={{ paddingX: 2, fontSize: "12px", flexShrink: 0 }}
            onClick={() => handleSubmit()}
          >
            Guardar
          </Button>
        </Box>
      </Box>
      <Box >
        <CategoriesTreeSelector
          root={collectionsMenu}
          onItemSelected={(item) => {
            console.log(item, item)
            setCollection(item.id);
          }}
        />
      </Box>
    </Stack>
  );
};
