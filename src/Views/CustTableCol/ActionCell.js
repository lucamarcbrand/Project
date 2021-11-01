import React from "react";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from '@mui/icons-material/Check';

//custom action cell column
function ActionCell({ param, actionClickHandler }) {
  return (
    <strong>
      {param.row.isEdit ? (
        <>
          <IconButton
            color="inherit"
            aria-label={"Save"}
            sx={{ mr: 0 }}
            onClick={(e) => actionClickHandler(e, param, "SAVE")}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label={"Cancel"}
            sx={{ mr: 0 }}
            onClick={(e) => actionClickHandler(e, param, "CANCEL")}
          >
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            color="inherit"
            aria-label={"Delete"}
            sx={{ mr: 0 }}
            onClick={(e) => actionClickHandler(e, param, "DELETE")}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label={"Edit"}
            sx={{ mr:  0}}
            onClick={(e) => actionClickHandler(e, param, "EDIT")}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </strong>
  );
}

export default ActionCell;
