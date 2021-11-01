import React from "react";
import TextField from "@mui/material/TextField";
function PostCodeCell({ param ,editRowHandler}) {
  return (
    <div>
      {param.row.isEdit ? (
        <TextField
          id={`postcodeEdit-${param.row.id}`}
          variant="standard"
          value={param.row.postcodeEdit}
          onChangeCapture={(e) => editRowHandler(e, param, "postcodeEdit")}
        />
      ) : (
        <div>{param.row.postcode}</div>
      )}
    </div>
  );
}

export default PostCodeCell;
