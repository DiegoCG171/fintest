import ModalFormJson from "../../components/UI/FormBuilder/ModalFormJson";
import { ModalComponentPropsMap } from "../../config/interfaces";

import { useAppSelector, useAppDispatch, closeModal } from "../../store";
import { Modal, Box, Portal } from "@mui/material";

const modalComponentMap: {
    [K in keyof ModalComponentPropsMap]: React.ComponentType<ModalComponentPropsMap[K]>;
} = {
    ModalFormJson,
};

export default function FullScreenModal() {
    const dispatch = useAppDispatch();
    
    const { isOpen, componentKey, componentProps } = useAppSelector(
        (state) => state.modalForm
    );
    if (!isOpen || !componentKey) return null;
    
    const DynamicComponent = modalComponentMap[componentKey as keyof ModalComponentPropsMap];

    if (!DynamicComponent) {
        return <div>Error: componente no encontrado</div>;
    }

    return (
        <Portal>
        <Modal open={isOpen} onClose={() => dispatch(closeModal())}>
            <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
                outline: "none",
            }}
            >
                <DynamicComponent
                    {...(componentProps as unknown as ModalComponentPropsMap[typeof componentKey])}
                />
            </Box>
        </Modal>
        </Portal>
    );
}
