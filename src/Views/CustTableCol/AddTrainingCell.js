import React from "react";
import { Button } from "@mui/material";


//custome table column to add training 
function AddTrainingCell({ param, actionClickHandler }) {
  return (
    <div>
      <Button
        size="small"
        aria-label={"Save"}
        onClick={(e) => actionClickHandler(e, param, "ADD_TRAINING")}
      >
        Add Training
      </Button>
    </div>
  );
}

export default AddTrainingCell;
