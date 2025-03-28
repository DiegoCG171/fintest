import { Breadcrumbs, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "@mui/material/Link";
import { useLocation, Link as RouterLink } from "react-router-dom";

const BREADCRUMB_NAMES: Record<string, string> = {
  "dashboard": "Panel",
  "ecommerce": "Tienda",
  "productos": "Productos",
  "editar": "Editar",
  "detalle": "Detalle",
};

function BreadcrumbComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const crumbs = pathnames.map((segment, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const name = BREADCRUMB_NAMES[segment] || segment;

    const isLast = index === pathnames.length - 1;
    return isLast ? (
      <Typography key={to} sx={{ color: "inherit", fontSize: "14px" }}>
        {name}
      </Typography>
    ) : (
      <Link
        key={to}
        underline="hover"
        color="inherit"
        component={RouterLink}
        to={to}
        sx={{ fontSize: "14px" }}
      >
        {name}
      </Link>
    );
  });

  return (
    <Breadcrumbs
      separator={<ArrowRightIcon sx={{ color: "text.disabled" }} />}
      sx={{ color: "#888888" }}
    >
      <Link
        underline="hover"
        color="inherit"
        component={RouterLink}
        to="/"
        sx={{ fontSize: "14px" }}
      >
        {BREADCRUMB_NAMES[""] || "Inicio"}
      </Link>
      {crumbs}
    </Breadcrumbs>
  );
}

export default BreadcrumbComponent;
