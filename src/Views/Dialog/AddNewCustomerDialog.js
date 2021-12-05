import * as React from "react";
import { Button } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { createNewCustomer } from "../../Services/API";

//initial state
const initCustomer = {
  city: "",
  email: "",
  firstname: "",
  lastname: "",
  phone: "",
  postcode: "",
  streetaddress: "",
};

//add new customer dialog component
export default function AddNewCustomerDialog({callBack}) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomerState] = React.useState(initCustomer);

  //open the add new customer dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
    //close the add new customer dialog
  const handleClose = () => {
    setOpen(false);
  };

  //function to create new customer
  const handleAdd = () => {
    const cust = customer;
    createNewCustomer(cust)
      .then((response) => {
        setOpen(false);
        setCustomerState({ initCustomer });
        callBack();
        console.log("user created");
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };
  // this will set values in state when form being fillied 
  const handleFormChange = (filed, value) => {
    switch (filed) {
      case "city":
        setCustomerState((prevState) => ({
          ...prevState,
          city: value,
        }));
        break;
      case "email":
        setCustomerState((prevState) => ({
          ...prevState,
          email: value,
        }));
        break;
      case "firstname":
        setCustomerState((prevState) => ({
          ...prevState,
          firstname: value,
        }));
        break;
      case "lastname":
        setCustomerState((prevState) => ({
          ...prevState,
          lastname: value,
        }));
        break;
      case "phone":
        setCustomerState((prevState) => ({
          ...prevState,
          phone: value,
        }));
        break;
      case "postcode":
        setCustomerState((prevState) => ({
          ...prevState,
          postcode: value,
        }));
        break;
      case "streetaddress":
        setCustomerState((prevState) => ({
          ...prevState,
          streetaddress: value,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add New Customer
      </Button>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new customer please fill bellow application form
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            variant="standard"
            onChange={(e) => handleFormChange("firstname", e.target.value)}
            style={{ paddingRight: 20 }}
          />
          <TextField
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            variant="standard"
            onChange={(e) => handleFormChange("lastname", e.target.value)}
            style={{ paddingRight: 20 }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            variant="standard"
            onChange={(e) => handleFormChange("email", e.target.value)}
            style={{ width: 410, paddingRight: 20 }}
          />
          <TextField
            margin="dense"
            variant="standard"
            label="Phone Number"
            onChange={(e) => handleFormChange("phone", e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            style={{ paddingRight: 20 }}
          />
          <TextField
            margin="dense"
            id="streetaddress"
            label="Address"
            type="text"
            variant="standard"
            fullWidth
            placeholder="Address"
            minRows={4}
            onChange={(e) => handleFormChange("streetaddress", e.target.value)}
            style={{ width: 410, paddingRight: 20 }}
          />
          <TextField
            margin="dense"
            id="postCode"
            label="Post Code"
            type="text"
            variant="standard"
            onChange={(e) => handleFormChange("postcode", e.target.value)}
            style={{ paddingRight: 20 }}
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            type="text"
            variant="standard"
            onChange={(e) => handleFormChange("city", e.target.value)}
            style={{ paddingRight: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
