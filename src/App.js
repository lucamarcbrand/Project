import ApplicationBar from "./Views/ApplicationBar";
import CustomerPage from "./Views/CustomerPage";
import TrainingsPage from "./Views/TrainingsPage";
import ApplicationDrawer from "./Views/ApplicationDrawer";
import "./App.css";
import React, { useState } from "react";
import {  Container } from "@mui/material";

//pages in application
const Pages = {
  Customers: "Customers",
  Training: "Training",
};
//initial state of application
const initState = {
  isDrawerOpen: false,
  mainPageName: Pages.Customers,
};
//application component
export const App = () => {
  //state of application
  const [state, setState] = useState(initState);

  //function to change the page 
  function changePage(pageName) {
    setState((prevState) => ({
      isDrawerOpen: !prevState.isDrawerOpen,
      mainPageName: Pages[pageName],
    }));
  }

  //it will open the menu drawer
  function openNavDrawer() {
    setState((prevState) => ({
      ...prevState,
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  }
  return (
    <div className="">
      <ApplicationBar openNav={openNavDrawer}></ApplicationBar>
      <ApplicationDrawer
        isDrawerOpen={state.isDrawerOpen}
        toggleDrawer={openNavDrawer}
        changePage={changePage}
      ></ApplicationDrawer>

      <Container >
        {state.mainPageName === Pages.Customers ? (
          <CustomerPage></CustomerPage>
        ) : (
          <TrainingsPage/>
        )}
      </Container>
    </div>
  );
};
export default App;
