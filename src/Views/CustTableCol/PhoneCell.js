import React from "react";
import TextField from "@mui/material/TextField";

function PhoneCell({ param ,editRowHandler}) {
  return (
    <div>
      {param.row.isEdit ? (
        <TextField
          id={`phoneEdit-${param.row.id}`}
          variant="standard"
          value={param.row.phoneEdit}
          onChangeCapture={(e) => editRowHandler(e, param, "phoneEdit")}
        />
      ) : (
        <div>{param.row.phone}</div>
      )}
    </div>
  );
}

export default PhoneCell;
