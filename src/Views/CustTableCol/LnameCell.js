import React from "react";
import TextField from "@mui/material/TextField";
function LnameCell({ param ,editRowHandler}) {
  return (
    <div>{param.row.isEdit ? (
      <TextField
        id={`lastnameEdit-${param.row.id}`}
        variant="standard"
        value={param.row.lastnameEdit}
        onChangeCapture={(e) => editRowHandler(e, param, "lastnameEdit")}
      />
    ) : <div>{param.row.lastname}</div>}</div>
  );
}

export default LnameCell;
