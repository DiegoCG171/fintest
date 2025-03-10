import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Person, Send, Settings } from '@mui/icons-material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Adquiriente" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      <ListItemText primary="Emisor" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Configuración" />
    </ListItemButton>
  </React.Fragment>
);

