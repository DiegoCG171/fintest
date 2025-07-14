import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { getCollectionsThunk } from "../../store/slices/collections/collections.thunk";
import { transformCollectionsToMenu } from "../utils";
import { setCollectionsData } from "../../store/slices/UI/sidebarMenu/sidebarMenu.slice";

export const useRefreshCollectionsMenu = () => {
    const dispatch = useAppDispatch();
    const { method = "", type = "" } = useParams();

    return async () => {
        const response = await dispatch(getCollectionsThunk(`${method}/${type}`)).unwrap();
        const transformed = transformCollectionsToMenu(response, `${method}/${type}/collections`);
        dispatch(setCollectionsData(transformed));
        return transformed;
    };
};
