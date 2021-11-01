import * as React from "react";
import { Button } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { addTraining } from "../../Services/API";
import moment from "moment";
//init state of add new training 
const initTraining = {
  date: "",
  duration: 0,
  activity: "",
  customer:""
};
//AddNewTraining component to show form for new training
export default function AddNewTraining({
  trainingDialog,
  currentCustHref,
  handleTrainingModelClose,
}) {
  //traning component state
  const [training, setTrainingState] = React.useState(initTraining);
//function to add new training
  const handleAddTraining = () => {
    const _training = training;
    _training.customer=currentCustHref;
    _training.date=moment(_training.date).toISOString();
    addTraining(_training)
      .then((response) => {
        handleTrainingModelClose(false);
        setTrainingState({ initTraining });
        console.log("Training added");
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };
  //this will set valuesin state on input given in form
  const handleFormChange = (filed, value) => {
    switch (filed) {
      case "date":
        setTrainingState((prevState) => ({
          ...prevState,
          date: value,
        }));
        break;
      case "duration":
        setTrainingState((prevState) => ({
          ...prevState,
          duration: value,
        }));
        break;
      case "activity":
        setTrainingState((prevState) => ({
          ...prevState,
          activity: value,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog open={trainingDialog} onClose={handleTrainingModelClose}>
        <DialogTitle>Training Form</DialogTitle>
        <DialogContent>
          <Stack>
            <TextField
              margin="dense"
              id="datetime-local"
              label="Training appointment"
              type="datetime-local"
              onChange={(e) => handleFormChange("date", e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              variant="standard"
              label="Duration (min)"
              onChange={(e) => handleFormChange("duration", e.target.value)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              style={{ paddingRight: 20 }}
            />
            <TextField
              margin="dense"
              id="activity"
              label="Activity"
              type="text"
              variant="standard"
              onChange={(e) => handleFormChange("activity", e.target.value)}
              style={{ paddingRight: 20 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrainingModelClose}>Cancel</Button>
          <Button onClick={handleAddTraining}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
