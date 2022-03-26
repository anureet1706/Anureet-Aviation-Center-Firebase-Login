import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { ROUTE } from "./routes";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar src="img/logo.png" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Anureet Aviation Center
          </Typography>
          {props.onAdd ? <Button color="inherit" onClick={() => props.onAdd()}>Add New</Button> : <></>}
          <Button
                component={Link}
                to={ROUTE.INDEX}
                variant="contained"
                className="logout-button"
              >
                Log Out
              </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}