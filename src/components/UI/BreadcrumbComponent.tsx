import { Breadcrumbs, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

function BreadcrumbComponent() {
  const normalizeName = (text: string) => {
    if(text === 'pos') return 'POS';
    if(text === 'atm') return 'ATM';
    return text.replace(/-/g, " ");
  }
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  pathnames.shift()
  pathnames.pop()
  const crumbs = pathnames.map((segment, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const name = normalizeName(segment);

    const isLast = index === pathnames.length - 1;
    return isLast ? (
      <Typography
        key={to}
        sx={{ color: "blue", fontSize: "12px", fontWeight: "bold" }}
      >
        {name}
      </Typography>
    ) : (
      <Link
        key={to}
        underline="hover"
        color="inherit"
        sx={{ fontSize: "12px" }}
      >
        {name}
      </Link>
    );
  });

  return (
    <Breadcrumbs
      separator={<ArrowRightIcon sx={{ color: "text.disabled" }} />}
      sx={{ color: "text.disabled", textTransform: "capitalize" }}
    >
      {crumbs}
    </Breadcrumbs>
  );
}

export default BreadcrumbComponent;
