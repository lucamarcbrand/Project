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
import InsightsIcon from "@mui/icons-material/Insights";

const menuItems = ["Customers", "Training", "Statistics"];

// drawer to show menus in application
const ApplicationDrawer = ({ isDrawerOpen, toggleDrawer, changePage }) => {
  function getpageIcon(text) {
    if (text === "Customers") {
      return <AccountBoxIcon />;
    } else if (text === "Training") {
      return <DirectionsRunIcon />;
    } else if (text === "Statistics") {
      return <InsightsIcon />;
    }
  }
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
          <ListItemIcon>{getpageIcon(text)}</ListItemIcon>
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
