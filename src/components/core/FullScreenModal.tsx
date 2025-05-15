import { Box, Button, Modal, Portal, Stack, Typography } from "@mui/material";
import { FullScreenModalProps } from "../../config/interfaces";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import FormJSON from "../UI/FormBuilder/FormJSON";
import {
    createTemplateThunk,
    useAppDispatch,
    useAppSelector,
} from "../../store";
import { resetJsonTemplate } from "../../store/slices/UI/form/jsonTemplateDraft.slice";

function FullScreenModal({ open, onClose, container }: FullScreenModalProps) {
    const dispatch = useAppDispatch();
    const jsonData = useAppSelector((state) => state.jsonTemplate.data);
    const handleSubmit = () => {
        dispatch(createTemplateThunk({ template: jsonData }))
        .unwrap()
        .then(() => {
            dispatch(resetJsonTemplate());
            onClose();
        })
        .catch((error) => {
            console.error("Error al crear template:", error);
        });
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
                        fontWeight: 'bold'
                    }}
                >
                    Crear nuevo template
                </Typography>
                <Typography
                    variant="body2"
                    gutterBottom
                >
                    Completa los campos necesarios para crear un nuevo templete que
                    podrás utilizar más adelante. Asegúrate de que toda la
                    información este correcta antes de guardar.
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
