import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const NewUserGuard = ({ children }: { children: ReactNode }) => {
  const status = useAppSelector((state) => state.auth.user?.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "new") {
      navigate("/change-password");
    }
  }, [status, navigate]);

  return <>{children}</>;
};

export default NewUserGuard;
