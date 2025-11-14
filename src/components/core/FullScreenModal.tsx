import ModalFormJson from "../../components/UI/FormBuilder/ModalFormJson";
import { ModalComponentPropsMap } from "../../config/interfaces";

import { useAppSelector, useAppDispatch, closeModal } from "../../store";
import { Modal, Box, Portal } from "@mui/material";
import { ModalAddToCollection } from "../UI/FormBuilder/ModalAddToCollection";
import { ModalProfile } from "../UI/overlays/ModalProfile";
import { SessionWarning } from "../UI/overlays/SessionWarning";

const modalComponentMap: {
    [K in keyof ModalComponentPropsMap]: React.ComponentType<
        ModalComponentPropsMap[K]
    >;
    } = {
    ModalFormJson,
    ModalAddToCollection,
    ModalProfile,
    SessionWarning,
};

export default function FullScreenModal() {
    const dispatch = useAppDispatch();
    const { isOpen, componentKey, componentProps } = useAppSelector(
        (state) => state.modalForm
    );

    if (!isOpen || !componentKey) return null;

    const DynamicComponent =
        modalComponentMap[componentKey as keyof ModalComponentPropsMap];

    if (!DynamicComponent) {
        return <div>Error: componente no encontrado</div>;
    }

    const handleClose = (_event: unknown, reason?: string) => {
        if (
        componentKey === "SessionWarning" &&
        (reason === "backdropClick" || reason === "escapeKeyDown")
        ) {
        return;
        }

        dispatch(closeModal());
    };

    return (
        <Portal>
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
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
                {...(componentProps as ModalComponentPropsMap[keyof ModalComponentPropsMap])}
            />
            </Box>
        </Modal>
        </Portal>
    );
}
