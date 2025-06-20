import { Box, Button, Stack, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FormJSON from "./FormJSON";
import {
    ModalFormProps,
    PatchGenerationTemplate,
} from "../../../config/interfaces";
import {
    closeModal,
    createTemplateThunk,
    getAllCategoriesThunk,
    getTemplatesThunk,
    updateTemplateThunk,
    useAppDispatch,
    useAppSelector,
} from "../../../store";
import { useToast } from "../../../config/hooks/useToast";
import {
    resetJsonTemplate,
    setJsonTemplate,
} from "../../../store/slices/UI/form/jsonTemplateDraft.slice";
import { saleTemplate } from "../../../config/mock";
import { deepClean } from "../../../config/utils/deepClean";
import { useEffect, useState } from "react";
import CategoriesFormJSON from "./CategoriesFormJSON";

function ModalFormJson({ mode = "create" }: ModalFormProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [categoryError, setCategoryError] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const templateData = useAppSelector((state) => state.templates.templateById);
    const [category, setCategory] = useState<string | null>(null);
    const templateName = useAppSelector((state) => state.jsonTemplate.data.name);
    const [newTemplateName, setVewTemplateName] = useState<string>(templateName);
    const [showTemplateNameError, setShowTemplateNameError] = useState(false);

    const templateId = useAppSelector(
        (state) => state.templates.templateById?._id
    );

    const isEditMode = mode === "edit";
    const title = isEditMode ? "Actualizar template" : "Crear nuevo template";
    let description = "";

    if (isEditMode) {
        description =
        "Edita el contenido del templete en formato JSON. Asegúrate de que los cambios cumplan con el formato y la estructura requerida antes de guardar.";
    } else {
        description =
        "Completa los campos necesarios para crear un nuevo template que podrás utilizar más adelante. Asegúrate de que toda la información esté correcta antes de guardar.";
    }

    useEffect(() => {
        if (isEditMode && templateName) {
        setVewTemplateName(templateName);
        } else if (!isEditMode) {
        setVewTemplateName(templateName);
        }
    }, [templateName, isEditMode]);

    useEffect(() => {
        if (mode === "create") {
        dispatch(setJsonTemplate(saleTemplate));
        } else if (
        mode === "edit" &&
        templateData &&
        !Array.isArray(templateData)
        ) {
        const cleanTemplate = deepClean(templateData, [
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
            "uuid",
            "path"
        ]);
        dispatch(setJsonTemplate(cleanTemplate));
        }
    }, [mode, templateData, dispatch]);

    const jsonData = useAppSelector((state) => state.jsonTemplate.data);
    const mutableJsonData = { ...jsonData };

    const handleSubmit = () => {
        if (mode === "create") {
        if (!category) {
            setCategoryError(true);
        } else createTemplate();
        } else editTemplate();
    };

    const createTemplate = async () => {
        if (!category) return;
        mutableJsonData.categoryId = category;
        mutableJsonData.name = newTemplateName;
        try {
        await dispatch(
            createTemplateThunk({ template: mutableJsonData })
        ).unwrap();
        dispatch(closeModal());
        showToast("Template creado correctamente", "success");
        dispatch(resetJsonTemplate());
        } catch (error) {
        showToast(error as string, "error");
        } finally {
        dispatch(getTemplatesThunk());
        dispatch(getAllCategoriesThunk())
            .unwrap()
            .catch((err) => console.error("Error cargando categorías:", err));
        }
    };

    const editTemplate = async () => {
        if (!templateId) return null;
        mutableJsonData.name = newTemplateName;
        try {
        await dispatch(
            updateTemplateThunk({
            id: templateId,
            payload: mutableJsonData as PatchGenerationTemplate,
            })
        ).unwrap();
        dispatch(closeModal());
        showToast("Template actualizado correctamente.", "success");
        dispatch(resetJsonTemplate());
        } catch (error) {
        showToast(error as string, "error");
        } finally {
        dispatch(getTemplatesThunk());
        dispatch(getAllCategoriesThunk())
            .unwrap()
            .catch((err) => console.error("Error cargando categorías:", err));
        }
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
            {title}
            </Typography>
            <Typography
            variant="body2"
            gutterBottom
            >
            {description}
            </Typography>
            {categoryError && (
            <Typography
                variant="body2"
                gutterBottom
                color="error.main"
            >
                Es necesario seleccionar una categoría.
            </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
                startIcon={
                step === 1 ? <ArrowForwardIosRoundedIcon /> : <SaveOutlinedIcon />
                }
                sx={{ paddingX: 2, fontSize: "12px", flexShrink: 0 }}
                onClick={() => {
                if (step === 1) {
                    setStep(2);
                } else {
                    handleSubmit();
                }
                }}
            >
                {step === 1 ? "Siguiente" : "Guardar"}
            </Button>
            </Box>
        </Box>
        <Box>
            {step === 1 && <FormJSON />}
            {step === 2 && (
            <CategoriesFormJSON
                showError={showTemplateNameError}
                templateName={newTemplateName ?? ""}
                onSelectCategory={(id) => {
                setCategory(id);
                }}
                onSetTemplateName={(name: string) => {
                setVewTemplateName(name);

                if (!name) {
                    setShowTemplateNameError(true);
                } else {
                    setShowTemplateNameError(false);
                }
                }}
            />
            )}
        </Box>
        </Stack>
  );
}
export default ModalFormJson;
