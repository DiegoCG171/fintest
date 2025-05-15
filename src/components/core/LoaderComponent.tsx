import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store";

const LoaderComponent = () => {
    const loading = useAppSelector((state) => state.loader.isLoading);
    return (
        <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 2000 })}
        open={loading}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    );
};
export default LoaderComponent;
