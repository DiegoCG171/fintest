import { useParams } from "react-router-dom";
import { getTemplatesBackup } from "../../../services";
import { createCategorieThunk, createTemplateThunk, getCategoriesByMethodThunk, getTemplateByIdThunk, getTemplatesThunk, openModal, setLoading, updateCategorieThunk, updateTemplateThunk, useAppDispatch } from "../../../store";
import { cleanObject } from "../../utils/cleandObject";
import { useToast } from "../useToast";


const useCategoriesActions = ({
    setEditingCategoryId,
    setCreatingCategoryId,
    setRenameTemplateId
}: {
    setEditingCategoryId: (id: string | null) => void;
    setCreatingCategoryId: (id: string | undefined) => void;
    setRenameTemplateId: (id: string | undefined) => void;
}) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const { method, type } = useParams();

    const addToCollections = (id: string) => {
        dispatch(
            openModal({
                componentKey: "ModalAddToCollection",
                componentProps: { templateId: id },
            })
        );
    };

    const createCategory = async (name: string, parent: string) => {
        const body = {
            name,
            parent
        };
        try {
            await dispatch(createCategorieThunk(body)).unwrap();
            await dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
                .unwrap()
                .catch((err) => console.error("Error cargando categorías:", err));
            showToast("Categoría creada exitoramente", "success");
            setTimeout(() => {
                setCreatingCategoryId(undefined);
            }, 300);
        } catch (error) {
            showToast(error as string | "Error al crear la categoría", "error");
            setCreatingCategoryId(undefined);
        }
    }

    const createTemplate = () => {
        dispatch(
            openModal({
                componentKey: "ModalFormJson",
                componentProps: { mode: "create" },
            })
        );
    };

    const editTemplate = async (id: string) => {
        dispatch(setLoading(true));
        try {
            await dispatch(getTemplateByIdThunk(id)).unwrap();
            dispatch(
                openModal({
                    componentKey: "ModalFormJson",
                    componentProps: { mode: "edit" },
                })
            );
        } catch (error) {
            showToast(error as string, "error");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const downloadTemplates = () => getTemplatesBackup();

    const duplicateTemplate = async (id: string) => {
        const originalTemplate = await dispatch(
            getTemplateByIdThunk(id)
        ).unwrap();

        if (!originalTemplate) {
            showToast("Template no encontrado", "error");
            return;
        }
        const copyTemplate = cleanObject(originalTemplate);
        try {
            await dispatch(
                createTemplateThunk({
                    template: {
                        ...copyTemplate,
                        name: `${copyTemplate.name} copia`,
                    },
                })
            ).unwrap();

            showToast("Copia del template creada correctamente", "success");
        } catch (error) {
            showToast(error as string, "error");
        } finally {
            dispatch(getTemplatesThunk());
            dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
                .unwrap()
                .catch((err: string) =>
                    console.error("Error cargando categorías:", err)
                );
        }
    };

    const renameCategory = async (item: string, newName: string) => {
        try {
            await dispatch(
                updateCategorieThunk({ id: item, data: { name: newName } })
            ).unwrap();
            await dispatch(
                getCategoriesByMethodThunk(`${method}/${type}`)
            ).unwrap();
            setEditingCategoryId(null);
            showToast("Categoría editada exitoramente", "success");
        } catch (error) {
            console.error(error)
            showToast(
                "Error al renombrar categoría",
                "error"
            );
        }
    };

    const renameTemplate = async (id: string, name: string) => {
        console.log(id)
        dispatch(setLoading(true));
        try {
            await dispatch(updateTemplateThunk({ id, payload: { name } })).unwrap();
            await dispatch(
                getCategoriesByMethodThunk(`${method}/${type}`)
            ).unwrap();
            setRenameTemplateId(undefined);
            showToast("Template renombrado exitoramente" as string, "success");
        } catch (error) {
            showToast(error as string, "error");
        } finally {
            dispatch(setLoading(false));
        }
    };


    return {
        addToCollections,
        createCategory,
        createTemplate,
        editTemplate,
        downloadTemplates,
        duplicateTemplate,
        renameCategory,
        renameTemplate
    }
}
export default useCategoriesActions