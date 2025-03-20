import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayoutComponent from "./layouts/MainLayoutComponent";
import LoginComponent from "./pages/Auth/login/LoginComponent";
import PrivateLayoutContent from "./layouts/PrivateLayoutContent";
import EcommerceComponent from "./pages/Catalogs/EcommerceComponent";
import SplashComponent from "./pages/SplashComponent";
import AuthLayoutComponent from "./layouts/AuthLayoutComponent";
import RegisterComponent from "./pages/Auth/RegisterComponent";

function App() {
  return (
    <Routes>
      <Route element={<MainLayoutComponent />}>
        {/* Ruta raíz */}
        <Route path="/" element={<SplashComponent />} />
        
        {/* Rutas de autenticación */}
        <Route element={<AuthLayoutComponent />}>
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
        </Route>
        
        {/* Rutas privadas */}
        <Route element={<PrivateLayoutContent />}>
          <Route path="/ecommerce" element={<EcommerceComponent />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;