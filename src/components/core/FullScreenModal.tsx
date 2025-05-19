import { Box, Button, Modal, Portal, Stack, Typography } from "@mui/material";
import {
    FullScreenModalProps,
    PatchGenerationTemplate,
} from "../../config/interfaces";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import FormJSON from "../UI/FormBuilder/FormJSON";
import {
    createTemplateThunk,
    updateTemplateThunk,
    useAppDispatch,
    useAppSelector,
} from "../../store";
import {
    resetJsonTemplate,
    setJsonTemplate,
} from "../../store/slices/UI/form/jsonTemplateDraft.slice";
import { saleTemplate } from "../../config/mock";
import { useEffect } from "react";
import { deepClean } from "../../config/utils/deepClean";

function FullScreenModal({ open, onClose, container }: FullScreenModalProps) {
    const dispatch = useAppDispatch();
    const modalStateMode = useAppSelector((state) => state.modalForm.mode);
    const templateData = useAppSelector((state) => state.templates.templateById);
    const isEditMode = modalStateMode === "edit";


    const title = isEditMode ? "Actualizar template" : "Crear nuevo template";

    const description = isEditMode
        ? "Edita el contenido del templete en formato JSON. Asegúrate de que los cambios cumplan con el formato y la estructura requerida antes de guardar."
        : "Completa los campos necesarios para crear un nuevo template que podrás utilizar más adelante. Asegúrate de que toda la información esté correcta antes de guardar.";
    useEffect(() => {
        if (modalStateMode === "create") {
        dispatch(setJsonTemplate(saleTemplate));
        } else if (
        modalStateMode === "edit" &&
        templateData &&
        !Array.isArray(templateData)
        ) {
        const cleanTemplate = deepClean(templateData, [
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
            "uuid",
        ]);
        dispatch(setJsonTemplate(cleanTemplate));

        dispatch(setJsonTemplate(cleanTemplate));
        }
    }, [modalStateMode, templateData, dispatch]);

    const jsonData = useAppSelector((state) => state.jsonTemplate.data);
    const handleSubmit = () => {
        if (modalStateMode === "create") {
        dispatch(createTemplateThunk({ template: jsonData }))
            .unwrap()
            .then(() => {
            dispatch(resetJsonTemplate());
            onClose();
            })
            .catch((error) => {
            console.error("Error al crear template:", error);
            });
        } else if (templateData && templateData._id) {
        dispatch(
            updateTemplateThunk({
            id: templateData._id,
            payload: jsonData as PatchGenerationTemplate,
            })
        )
            .unwrap()
            .then(() => {
            dispatch(resetJsonTemplate());
            onClose();
            })
            .catch((error) => {
            console.error("Error al editar template:", error);
            });
        } else {
        console.warn(
            "No se puede editar: el template aún no está listo o no tiene ID."
        );
        }
    };
    if (!open) return null;
    return (
        <Portal container={container}>
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                bgcolor: "background.paper",
                border: 0,
                borderRadius: 2,
                boxShadow: 24,
                pt: 2,
                px: 4,
                pb: 3,
                outline: "none",
                "&:focus": {
                outline: "none",
                },
            }}
            >
            <Stack spacing={2}>
                <Box>
                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                    fontWeight: "bold",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    gutterBottom
                >
                    {description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                    startIcon={<SaveOutlinedIcon />}
                    sx={{
                        paddingX: 2,
                        fontSize: "12px",
                        flexShrink: 0,
                    }}
                    onClick={handleSubmit}
                    >
                    Guardar
                    </Button>
                </Box>
                </Box>
                <Box>
                <FormJSON></FormJSON>
                </Box>
            </Stack>
            </Box>
        </Modal>
        </Portal>
    );
}
export default FullScreenModal;
