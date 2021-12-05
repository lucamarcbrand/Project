import React, { useEffect, useState, useRef } from "react";
import fileSaver from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material/";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../Services/API";
import ActionCell from "./CustTableCol/ActionCell";
import FnameCell from "./CustTableCol/FnameCell";
import LnameCell from "./CustTableCol/LnameCell";
import CityCell from "./CustTableCol/CityCell";
import EmailCell from "./CustTableCol/EmailCell";
import StreetAddressCell from "./CustTableCol/StreetAddressCell";
import PostCodeCell from "./CustTableCol/PostCodeCell";
import PhoneCell from "./CustTableCol/PhoneCell";
import AlertDialog from "./Dialog/AlertDialog";
import AddNewCustomerDialog from "./Dialog/AddNewCustomerDialog";
import AddTrainingCell from "./CustTableCol/AddTrainingCell";
import AddNewTraining from "./Dialog/AddNewTraining";

//initial state of customer page
const initialState = {
  customers: [],
  currentPageCust: [],
  pageSize: 5,
  currentPageIndex: 0,
  total: 0,
  currentCustHref: "",
};
function writeToCSVFile(customers) {
  const filename = "customers.csv";
  const data = extractAsCSV(customers);
  const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
  fileSaver.saveAs(blob, filename);
}

function extractAsCSV(customers) {
  const header = [
    "firstname, lastname, email, phone, streetaddress postcode, city",
  ];
  const rows = customers.map(
    (cust) =>
      `${cust.firstname}, ${cust.lastname}, ${cust.email}, ${cust.phone}, ${cust.streetaddress}, ${cust.postcode}, ${cust.city}`
  );
  return header.concat(rows).join("\n");
}
//customer page component
const CustomerPage = () => {
  //states of the componet
  const [state, setstate] = useState(initialState);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [trainingDialog, setTrainingDialogOpen] = useState(false);
  const [search, setSarchCust] = useState("");

  //it will open add training dialog box
  const handleTrainingModelOpen = () => {
    setTrainingDialogOpen(true);
  };
  //it will close the training dialog box
  const handleTrainingModelClose = () => {
    setTrainingDialogOpen(false);
  };
  //set search value in state
  const searchCust = (query) => {
    setSarchCust(query);
  };
  //this method will handle the customer delete action
  const handleDeleteAction = () => {
    const href = state.currentCustHref;
    deleteCustomer(href)
      .then((response) => {
        setOpen(false);
        console.log("customer deleted succesfuly");
        fetchAllCust();
      })
      .catch((error) => {
        setOpen(false);
        console.log("failed to delete");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const gridRef = useRef();
  //defined table columns here
  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (param) => (
        <ActionCell param={param} actionClickHandler={actionClickHandler} />
      ),
    },
    {
      field: "AddTraining",
      type: "AddTraining",
      headerName: "Add Training",
      width: 120,
      renderCell: (param) => (
        <AddTrainingCell
          param={param}
          trainingDialog={trainingDialog}
          actionClickHandler={actionClickHandler}
        />
      ),
    },
    {
      field: "firstname",
      headerName: "First Name",
      width: 150,
      renderCell: (param) => (
        <FnameCell param={param} editRowHandler={editRowHandler} />
      ),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
      renderCell: (param) => (
        <LnameCell param={param} editRowHandler={editRowHandler} />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      renderCell: (param) => (
        <EmailCell param={param} editRowHandler={editRowHandler} />
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
      renderCell: (param) => (
        <PhoneCell param={param} editRowHandler={editRowHandler} />
      ),
    },
    {
      field: "streetaddress",
      headerName: "Address",
      width: 150,
      renderCell: (param) => (
        <StreetAddressCell param={param} editRowHandler={editRowHandler} />
      ),
    },
    {
      field: "postcode",
      headerName: "Post Code",
      width: 100,
      renderCell: (param) => (
        <PostCodeCell param={param} editRowHandler={editRowHandler} />
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
      renderCell: (param) => (
        <CityCell param={param} editRowHandler={editRowHandler} />
      ),
    },
  ];

  //here we handles the action taken from grid aciton column
  const actionClickHandler = (event, param, action) => {
    debugger;
    switch (action) {
      case "EDIT":
      case "CANCEL": {
        param.row.isEdit = !param.row.isEdit;
        break;
      }
      case "SAVE": {
        const { href } = param.row.links.find((ele) => ele.rel === "customer");
        const body = copyEditedPropToOriginalProp(param.row);
        updateCustomer(href, body)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      }
      case "DELETE": {
        const { href } = param.row.links.find((ele) => ele.rel === "customer");
        setstate((prevState) => ({
          ...prevState,
          currentCustHref: href,
        }));
        setOpen(true);
        break;
      }
      case "ADD_TRAINING": {
        const { href } = param.row.links.find((ele) => ele.rel === "customer");
        setstate((prevState) => ({
          ...prevState,
          currentCustHref: href,
        }));
        handleTrainingModelOpen();
        break;
      }
      default:
        break;
    }
  };
  // copy the temp modified grid input box value to original state values
  const copyEditedPropToOriginalProp = (row) => {
    row.city = row.cityEdit;
    row.email = row.emailEdit;
    row.firstname = row.firstnameEdit;
    row.isEdit = false;
    row.lastname = row.lastnameEdit;
    row.phone = row.phoneEdit;
    row.postcode = row.postcodeEdit;
    row.streetaddress = row.streetaddressEdit;
    return {
      city: row.city,
      email: row.email,
      firstname: row.firstname,
      lastname: row.lastname,
      phone: row.phone,
      postcode: row.postcode,
      streetaddress: row.streetaddress,
    };
  };
  //this function is to edit row input box values
  const editRowHandler = (event, param, col) => {
    param.row[col] = event.target.value;
  };
  const handleExportCSV = () => {
    const customers = state.customers;
    writeToCSVFile(customers);
  };
  //function to fetch al customers detail
  const fetchAllCust = () => {
    fetchAllCustomers().then((response) => {
      let _customers = response.content;
      _customers = _customers.map((cust) => {
        cust.id = cust.firstname + cust.phone;
        cust.isEdit = false;
        cust.firstnameEdit = cust.firstname;
        cust.lastnameEdit = cust.lastname;
        cust.streetaddressEdit = cust.streetaddress;
        cust.postcodeEdit = cust.postcode;
        cust.cityEdit = cust.city;
        cust.emailEdit = cust.email;
        cust.phoneEdit = cust.phone;
        return cust;
      });
      if (_customers.length > 0) {
        setstate((prevState) => ({
          ...prevState,
          customers: _customers,
          total: _customers.length,
        }));
      }
    });
  };

  //onloading of page fetch cutomer records
  useEffect(() => {
    fetchAllCust();
  }, []);
  return (
    <div>
      <div style={{ height: 380, width: "100%" }}>
        <h2>Customers</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <div style={{display:"flex"}}>
            <div style={{paddingRight:10}}>
              <AddNewCustomerDialog callBack={fetchAllCust} />
            </div>
            
            <div>
              
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportCSV}
              >
                Export Customers data
              </Button>
            </div>
          </div>

          <div>
            <TextField
              margin="dense"
              id="search"
              label="Search"
              type="text"
              variant="standard"
              onChange={(e) => searchCust(e.target.value)}
              style={{ paddingRight: 20 }}
            />
          </div>
        </div>
        <DataGrid
          editMode="row"
          page={page}
          apiRef={gridRef}
          onPageChange={(newPage) => setPage(newPage)}
          pageSize={state.pageSize}
          onPageSizeChange={(pSize) =>
            setstate((prevState) => ({
              ...prevState,
              pageSize: pSize,
            }))
          }
          rowsPerPageOptions={[5, 10]}
          pagination
          rows={
            search.length >= 3
              ? state.customers.filter(
                  (cust) =>
                    cust.firstname
                      .toLowerCase()
                      .startsWith(search.toLowerCase()) ||
                    cust.lastname.toLowerCase().startsWith(search.toLowerCase())
                )
              : state.customers
          }
          columns={columns}
        />
        <AlertDialog
          open={open}
          handleClose={handleClose}
          handleDeleteAction={handleDeleteAction}
        ></AlertDialog>
        <AddNewTraining
          currentCustHref={state.currentCustHref}
          trainingDialog={trainingDialog}
          handleTrainingModelClose={handleTrainingModelClose}
        ></AddNewTraining>
      </div>
    </div>
  );
};

export default CustomerPage;
