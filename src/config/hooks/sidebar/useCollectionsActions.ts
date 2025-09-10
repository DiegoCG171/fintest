import { useParams } from "react-router-dom";
import { updateTestCaseThunk, useAppDispatch } from "../../../store";
import { createCollectionThunk, getCollectionsThunk, updateCollectionThunk } from "../../../store/slices/collections/collections.thunk";
import { useToast } from "../useToast";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

const useCollectionsActions = ({
    setEditingCollectionId,
    setRenameTestCaseId,
    setIsCreatingCollection
}: {
    setEditingCollectionId: (id: string | undefined) => void;
    setRenameTestCaseId: (id: string | undefined) => void;
    setIsCreatingCollection: Setter<boolean>;
}) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const { method, type } = useParams();

    const createCollecetion = async (name: string) => {
        const origin = method?.toUpperCase()
        try {
            await dispatch(
                createCollectionThunk({ name, origin})
            ).unwrap();
            await dispatch(getCollectionsThunk(`${method}/${type}`))
                .unwrap()
                .catch((err) => console.error("Error cargando colecciones:", err));
            showToast("Colección creada exitoramente", "success");
            setIsCreatingCollection(false)
        } catch (err) {
            showToast(err as string | "Error al crear la colección" , "error")
        } finally {
            setIsCreatingCollection(false);
        }
    }

    const renameCollection = async (id: string, name: string) => {
        try {
            await dispatch(
                updateCollectionThunk({ id, payload: { name } })
            ).unwrap();
            await dispatch(getCollectionsThunk(`${method}/${type}`))
                .unwrap()
                .catch((err) => console.error("Error cargando colecciones:", err));
            showToast("Colección renombrada exitoramente", "success");
            setTimeout(() => {
                setEditingCollectionId(undefined);
            }, 300);
        } catch (error) {
            showToast(error as string | "Error al renombrar la colección", "error");
            setEditingCollectionId(undefined);
        } finally {
            setEditingCollectionId(undefined);
        }
    }

    const renameTestCase = async (id: string, name: string) => {
        try {
            await dispatch(
                updateTestCaseThunk({ id, payload: { name } })
            ).unwrap();
            await dispatch(
                getCollectionsThunk(`${method}/${type}`)
            ).unwrap();
            setRenameTestCaseId(undefined);
            showToast("Caso de prueba actualizado exitoramente", "success");
        } catch (error) {
            showToast(error as string | "Error al renombrar el casod e prueba", "error");
            setRenameTestCaseId(undefined);
        }

    }
    return {
        createCollecetion,
        renameCollection,
        renameTestCase
    }
}
export default useCollectionsActions