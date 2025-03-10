import { Route, Routes } from "react-router-dom";
import { PublicRouter, PrivateRouter, MainRouter, AuthRouter } from "./";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export const AppRouter = () => {

  const { user } = useSelector((state: RootState) => state.auth);
  const { connectSocket, disconectSocket } = useSocket({
    serverPath: import.meta.env.VITE_API_DOMAIN ?? "http://localhost:3000/",
  });


  useEffect(() => {
    if (user.id !== "") {
      connectSocket();
    }
  }, [user]);

  useEffect(() => {
    if (user.id === "") {
      disconectSocket();
    }
  }, [user]);

  return (
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRouter>
              <AuthRouter />
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter>
              <MainRouter />
            </PrivateRouter>
          }
        />
      </Routes>
  );
};
