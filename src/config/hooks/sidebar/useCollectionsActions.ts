import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { getCollectionsThunk, updateCollectionThunk } from "../../../store/slices/collections/collections.thunk";
import { useToast } from "../useToast";

const useCollectionsActions = ({
    setEditingCollectionId
}: {
    setEditingCollectionId: (id: string | null) => void;
}) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const { method, type } = useParams();

    const renameCollection = async (id: string, name: string) => {
        try {
            await dispatch(
                updateCollectionThunk({ id, payload: { name } })
            ).unwrap();
            await dispatch(getCollectionsThunk(`${method}/${type}`))
                .unwrap()
                .catch((err) => console.error("Error cargando colecciones:", err));
            showToast("Colección creada exitoramente", "success");
            setTimeout(() => {
                setEditingCollectionId(null);
            }, 300);
        } catch (error) {
            showToast(error as string | "Error al crear la colección", "error");
            setEditingCollectionId(null);
        } finally {
            setEditingCollectionId(null);
        }
    }
    return {
        renameCollection
    }
}
export default useCollectionsActions