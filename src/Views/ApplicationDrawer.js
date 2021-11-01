import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const menuItems = ["Customers", "Training"];

// drawer to show menus in application
const ApplicationDrawer = ({ isDrawerOpen, toggleDrawer, changePage }) => {
  function listItems() {
    return menuItems.map((text, index) => {
      return (
        <ListItem
          button
          key={text}
          onClick={() => {
            toggleDrawer();
            changePage(text);
           
          }}
        >
          <ListItemIcon>
            {text === "Customers" ? <AccountBoxIcon /> : <DirectionsRunIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    });
  }
  return (
    <>
      <div>
        <React.Fragment>
          <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
              }}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <List>{listItems()}</List>
            </Box>
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
};

export default ApplicationDrawer;
