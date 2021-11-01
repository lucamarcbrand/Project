import React, { useState, useEffect } from "react";
import TrainingActionCell from "./TrainingTableCol/TrainingActionCell";
import { fetchTrainings,deleteTraining } from "./../Services/API";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import moment from "moment";
import AlertDialog from "./Dialog/AlertDialog";
//default state
const initialTraining = {
  trainings: [],
  total: 0,
  pageSize: 5,
  traniningId:""
};
const TrainingsPage = () => {
  //column object passed to table component
  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (param) => (
        <TrainingActionCell
          param={param}
          actionClickHandler={actionClickHandler}
        />
      ),
    },
    {
      field: "activity",
      headerName: "Activity",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
    },
    {
      field: "duration",
      headerName: "Duration (min)",
      width: 250,
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 250,
    },
  ];
  //states of component
  const [state, setstate] = useState(initialTraining);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSarchCust] = useState("");

  // set search qury in store
  const searchCust = (query) => {
    setSarchCust(query);
  };

  ///close the dialog box
  const handleClose = () => {
    setOpen(false);
  };
  //fetch all training on load of page
  useEffect(() => {
    fetchAllTrainings();
  }, []);

  //make delete call on confirmation 
  const handleDeleteAction = () => {
    deleteTraining(state.traniningId)
      .then((response) => {
        setOpen(false);
        console.log("Training deleted succesfuly");
        fetchAllTrainings();
      })
      .catch((error) => {
        setOpen(false);
        console.log("failed to delete");
      });
  };
  ///fetch all the traings 
  const fetchAllTrainings = () => {
    fetchTrainings().then((response) => {
      let _trainings = response;
      _trainings = _trainings.map((training) => {
        training.customerName = `${training.customer.firstname} , ${training.customer.lastname}`;
        training.traniningId = training.id;
        training.id = training.customer.id + training.date;
        training.date = moment(training.date).format("LLL");
        return training;
      });
      if (_trainings.length > 0) {
        setstate((prevState) => ({
          ...prevState,
          trainings: _trainings,
          total: _trainings.length,
        }));
      }
    });
  };
  //Delete training on click of delete icon
  const actionClickHandler = (event, param, action) => {
    debugger;
    switch (action) {
      case "DELETE": {
        setOpen(true);
        setstate((prevState) => ({
          ...prevState,
          traniningId: param.row.traniningId
        }));
        break;
      }

      default:
        break;
    }
  };
  return (
    <div>
      <h2>Trainings</h2>
      <div>
        <TextField
          margin="dense"
          id="search"
          label="Search Customer"
          type="text"
          variant="standard"
          onChange={(e) => searchCust(e.target.value)}
          style={{ paddingRight: 20 }}
        />
      </div>
      <div style={{ height: 400, width: "90%" }}>
        <DataGrid
          page={page}
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
              ? state.trainings.filter((training) =>
                  training.customerName
                    .toLowerCase()
                    .startsWith(search.toLowerCase())
                )
              : state.trainings
          }
          columns={columns}
        />
      </div>
      <AlertDialog
          open={open}
          handleClose={handleClose}
          handleDeleteAction={handleDeleteAction}
        ></AlertDialog>
    </div>
  );
};
export default TrainingsPage;
