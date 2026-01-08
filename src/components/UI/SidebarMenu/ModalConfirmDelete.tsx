import { Box, Button, Modal, Portal, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteCategorieThunk, deleteUserThunk, getCategoriesByMethodThunk, removeTab, useAppDispatch, useAppSelector } from "../../../store";
import { closeConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import {
  deleteCollectionThunk,
  deleteTestCaseThunk,
  getCollectionsThunk,
} from "../../../store/slices/collections/collections.thunk";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../config/hooks/useToast";
import { useEffect, useState } from "react";
import { deleteTemplateThunk } from "../../../store/slices/templates/templates.thunk";
import { deleteInstitutionsThunk } from "../../../store/slices/institutions/institutions.thunk";
import { deleteSecurityPermissionsThunk, deleteSecurityRolesThunk } from "../../../store/slices/security/security.thunk";
import { removeSubRule, removeTopLevelRule } from "../../../store/slices/extractionsRules/extractionRulesSlice";
import { deleteExtractionRuleThunk } from "../../../store/slices/extractionsRules/extractionRules.thunk";

const resourceActions = {
  testCase: {
    deleteThunk: deleteTestCaseThunk,
    hasTab: true,
    toastMessage: "Caso de uso eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el caso de uso?",
    origin: 'collections'
  },
  collection: {
    deleteThunk: deleteCollectionThunk,
    hasTab: false,
    toastMessage: "Colección eliminada correctamente",
    title: "¿Estás seguro de que deseas eliminar la colección?",
    origin: 'collections'
  },
  category: {
    deleteThunk: deleteCategorieThunk,
    hasTab: false,
    toastMessage: "Categoria eliminada correctamente",
    title: "¿Estás seguro de que deseas eliminar la categoría?",
    origin: 'categories'
  },
  template: {
    deleteThunk: deleteTemplateThunk,
    hasTab: true,
    toastMessage: "Template eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el template?",
    origin: 'categories'
  },
  user: {
    deleteThunk: deleteUserThunk,
    toastMessage: "Usuario eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el usuario?",
  },
  institution: {
    deleteThunk: deleteInstitutionsThunk,
    toastMessage: "Institución eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar la institución?",
  },
  rol: {
    deleteThunk: deleteSecurityRolesThunk,
    toastMessage: "Rol eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el rol?",
  },
  permission: {
    deleteThunk: deleteSecurityPermissionsThunk,
    toastMessage: "Permiso eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el permiso?",
  },
  rule: {
    deleteThunk: deleteExtractionRuleThunk,
    toastMessage: "Regla eliminada correctamente",
    title: "¿Estás seguro de que deseas eliminar la regla?",
  },
  topRule: {
    deleteThunk: removeTopLevelRule,
    toastMessage: "Subelemento eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el Subelemento?",
  },
  subRule: {
    deleteThunk: removeSubRule,
    toastMessage: "Subelemento eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el Subelemento?",
  },
} as const;

type ResourceKey = keyof typeof resourceActions;

const isValidResource = (r: string): r is ResourceKey => {
  return r in resourceActions;
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export const ModalConfirmDelete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method, type } = useParams();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { isOpen, id, resource } = useAppSelector(
    (state) => state.confirmDeleteModal
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleText, setTitleText] = useState(
    "¿Estás seguro de que deseas eliminar esto?"
  );

  const handleConfirm = async () => {
    if (!isValidResource(resource)) return;
    try {
      setIsDeleting(true);
      const config = resourceActions[resource];
      const { origin } = config
  
      await dispatch<unknown>(config.deleteThunk(id));
   
      if (config.hasTab) {
        const route = `${method}/${type}/${origin}`;
        const deletedTabRoute = `/${route}/${id}`;
  
        dispatch(removeTab(`${route}/${id}`));
  
        if (location.pathname === deletedTabRoute) {
          navigate(`/${method}/${type}/detalles`, { replace: true });
        }
      }
  
      if (method && type) {
        await dispatch(getCollectionsThunk(`${method}/${type}`));
        await dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
      }
      dispatch(closeConfirmDeleteModal());
      showToast(config.toastMessage, "success");
      
    } finally{
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    dispatch(closeConfirmDeleteModal());
  };

  useEffect(() => {
    if (isValidResource(resource)) {
      setTitleText(resourceActions[resource].title);
    }
  }, [resource]);

  return (
    <Portal>
      <Modal open={isOpen}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{titleText}</Typography>
          <Typography sx={{ mt: 2 }}>
            Una vez eliminado, no podrás recuperar este contenido.
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleConfirm}
              variant="contained"
              color="error"
              loading={isDeleting}
            >
              Eliminar
            </Button>
            <Button
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              variant="contained"
              disabled={isDeleting}
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Portal>
  );
};
