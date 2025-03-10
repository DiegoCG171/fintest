import React from "react";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/KeyboardBackspace';

const BackToLoginLink: React.FC = () => {
  return (
    <Grid container justifyContent={"center"}>
      <Grid item>
        <NavLink style={{textDecoration: 'none', color: '#1565c0', display: 'flex'}} to="/auth/login">
          <ArrowBackIcon style={{marginRight: 8}} /> Regresar al login
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default BackToLoginLink;
