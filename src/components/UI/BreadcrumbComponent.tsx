import { Breadcrumbs, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "@mui/material/Link";

type BreadcrumbComponentProps = {
    pathNames: string[]
};

function BreadcrumbComponent({ pathNames }: BreadcrumbComponentProps) {

  const crumbs = pathNames.map((segment:string, index: number) => {
    const to = `/${pathNames.slice(0, index + 1).join("/")}`;
    const name = segment;

    const isLast = index === pathNames.length - 1;
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
