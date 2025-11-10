import { Box, Button, Stack, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import FormJSON from "./FormJSON";
import {
  ModalFormProps,
  PatchGenerationTemplate,
  TemplateContextType,
} from "../../../config/interfaces";
import {
  closeModal,
  createTemplateThunk,
  getCategoriesByMethodThunk,
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
import { useParams } from "react-router-dom";
import {
  assignDefaultFunctions,
  setTabFormFromTemplate,
} from "../../../config/utils/setTabFormFromTemplate";
import { addOrUpdateTemplate } from "../../../store/slices/templates/template.slice";

function ModalFormJson({ mode = "create" }: ModalFormProps) {
  const [step, setStep] = useState<number>(1);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const templateData = useAppSelector((state) => state.templates.templateById);
  const [category, setCategory] = useState<string | null>(null);
  const [ruleSelected, setRuleSelected] = useState<string | null>(null);
  const templateName = useAppSelector((state) => state.jsonTemplate.data.name);
  const categoryId = useAppSelector(
    (state) => state.jsonTemplate.data.categoryId
  );
  const [newTemplateName, setVewTemplateName] = useState<string>(templateName);
  const [showTemplateNameError, setShowTemplateNameError] = useState(false);
  const preselectedItemId = category ?? categoryId ?? "";
  const rawRules = useAppSelector((state) => state.rules.rules);

  const templateId = useAppSelector(
    (state) => state.templates.templateById?.uuid
  );
  const [ruleError, setRuleError] = useState(false);

  const params = useParams();
  const { method, type } = params;

  const isEditMode = mode === "edit";
  const title = isEditMode ? "Actualizar template" : "Crear nuevo template";
  const description = isEditMode
    ? "Edita el contenido del templete en formato JSON. Asegúrate de que los cambios cumplan con el formato y la estructura requerida antes de guardar."
    : "Completa los campos necesarios para crear un nuevo template que podrás utilizar más adelante. Asegúrate de que toda la información esté correcta antes de guardar.";

  // sincroniza nombre inicial
  useEffect(() => {
    if (templateName) setVewTemplateName(templateName);
  }, [templateName]);

  // carga inicial
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
        "path",
      ]);

      if (cleanTemplate.schemaId) {
        setRuleSelected(cleanTemplate.schemaId);
      }
      dispatch(setJsonTemplate(cleanTemplate));
    }
  }, [mode, templateData, dispatch]);

  const jsonData = useAppSelector((state) => state.jsonTemplate.data);
  const mutableJsonData = JSON.parse(JSON.stringify(jsonData));

  const handleSubmit = () => {
    if (mode === "create") {
      if (!category) {
        setCategoryError(true);
        return;
      }
      if (!ruleSelected) {
        setRuleError(true);
        return;
      }
      createTemplate();
    } else {
      if (!ruleSelected) {
        setRuleError(true);
        return;
      }
      editTemplate();
    }
  };

  const createTemplate = async () => {
    if (!category) return;
    mutableJsonData.categoryId = category;
    mutableJsonData.name = newTemplateName;
    mutableJsonData.schemaId = ruleSelected;
    mutableJsonData.processingMethod = type;
    assignDefaultFunctions(mutableJsonData);
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
      dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  };

  const editTemplate = async () => {
    if (!templateId || !category) return;
    mutableJsonData.name = newTemplateName;
    mutableJsonData.categoryId = category;
    mutableJsonData.schemaId = ruleSelected;
    assignDefaultFunctions(mutableJsonData);
    try {
      const result = await dispatch(
        updateTemplateThunk({
          id: templateId,
          payload: mutableJsonData as PatchGenerationTemplate,
        })
      ).unwrap();
      const template = result;
      dispatch(addOrUpdateTemplate(template as TemplateContextType));
      if (template) {
        setTabFormFromTemplate(
          template as TemplateContextType,
          "generationTransaction",
          rawRules,
          dispatch
        );
        setTabFormFromTemplate(
          template as TemplateContextType,
          "validationTransaction",
          rawRules,
          dispatch
        );
        setTabFormFromTemplate(
          template as TemplateContextType,
          "selectionTransaction",
          rawRules,
          dispatch
        );
      }
      dispatch(closeModal());
      showToast("Template actualizado correctamente.", "success");
      dispatch(resetJsonTemplate());
    } catch (error) {
      showToast(error as string, "error");
    } finally {
      dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{ overflow: "visible" }}
    >
      <Box>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
        >
          {description}
        </Typography>

        {categoryError && !category && (
          <Typography
            variant="body2"
            gutterBottom
            color="error.main"
          >
            Es necesario seleccionar una categoría.
          </Typography>
        )}

        {/* navegación */}
<Box
  sx={{
    display: "flex",
    justifyContent: step > 1 ? "space-between" : "flex-end",
    mt: 2,
  }}
>
  {step > 1 && (
    <Button
      startIcon={<ArrowBackIosNewRoundedIcon />}
      sx={{ fontSize: "12px", flexShrink: 0, paddingX: 2 }}
      onClick={() => setStep(step - 1)}
    >
      Atrás
    </Button>
  )}

  <Button
    startIcon={step === 2 ? <SaveOutlinedIcon /> : null}
    endIcon={step === 1 ? <ArrowForwardIosRoundedIcon /> : null}
    sx={{ paddingX: 2, fontSize: "12px", flexShrink: 0 }}
    onClick={() => {
      if (step === 1) {
        setStep(2);
        return;
      }
      handleSubmit();
    }}
  >
    {step === 1 ? "Siguiente" : "Guardar"}
  </Button>
</Box>

      </Box>

      {/* contenido dinámico */}
      <Box sx={{ overflow: "visible" }}>
        {step === 1 && <FormJSON />}
        {step === 2 && (
          <CategoriesFormJSON
            showRuleError={ruleError}
            setShowError={setRuleError}
            ruleSelected={ruleSelected}
            onSelectRule={(id: string) => setRuleSelected(id)}
            showError={showTemplateNameError}
            templateName={newTemplateName ?? ""}
            preselectedItemId={preselectedItemId}
            onSelectCategory={(id) => setCategory(id)}
            onSetTemplateName={(name: string) => {
              setVewTemplateName(name);
              setShowTemplateNameError(!name);
            }}
          />
        )}
      </Box>
    </Stack>
  );
}

export default ModalFormJson;
