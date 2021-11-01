import React from "react";
import TextField from "@mui/material/TextField";
//custom action cell column
function EmailCell({ param, editRowHandler }) {
  return (
    <div>
      {param.row.isEdit ? (
        <TextField
          id={`emailEdit-${param.row.id}`}
          variant="standard"
          value={param.row.emailEdit}
          onChangeCapture={(e) => editRowHandler(e, param, "emailEdit")}
        />
      ) : (
        <div>{param.row.email}</div>
      )}
    </div>
  );
}

export default EmailCell;
