import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

//this componenet is for delete btn in trainings table
function TrainingActionCell({ param, actionClickHandler }) {
  return (
    <strong>
      <IconButton
        color="inherit"
        aria-label={"Delete"}
        sx={{ mr: 0 }}
        onClick={(e) => actionClickHandler(e, param, "DELETE")}
      >
        <DeleteIcon />
      </IconButton>
    </strong>
  );
}

export default TrainingActionCell;
