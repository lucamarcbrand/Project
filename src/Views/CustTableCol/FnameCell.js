import React from "react";
import TextField from "@mui/material/TextField";
function FnameCell({ param, editRowHandler }) {
  return (
    <div>
      {param.row.isEdit ? (
        <TextField
          id={`firstnameEdit-${param.row.id}`}
          variant="standard"
          value={param.row.firstnameEdit}
          onChangeCapture={(e) => editRowHandler(e, param, "firstnameEdit")}
        />
      ) : (
        <div>{param.row.firstname}</div>
      )}
    </div>
  );
}

export default FnameCell;
