import ModalFormJson from "../../components/UI/FormBuilder/ModalFormJson";
import { ModalComponentPropsMap } from "../interfaces";

export const modalComponentMap: {
    [K in keyof ModalComponentPropsMap]: React.ComponentType<
        ModalComponentPropsMap[K]
    >;
    } = {
    ModalFormJson,
};
