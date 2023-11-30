import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Breadcrumbs,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import DataTable from "./components/DataTable";

function App() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Template
          </Typography>
        </Toolbar>
      </AppBar>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Results</Typography>
      </Breadcrumbs>
      <Container>
        <DataTable />
      </Container>
    </Container>
  );
}

export default App;
