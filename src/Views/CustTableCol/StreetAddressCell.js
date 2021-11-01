import React from "react";
import TextField from "@mui/material/TextField";
function StreetAddressCell({ param ,editRowHandler}) {
  return (
    <div>
      {param.row.isEdit ? (
        <TextField
          id={`streetaddressEdit-${param.row.id}`}
          variant="standard"
          value={param.row.streetaddressEdit}
          onChangeCapture={(e) => editRowHandler(e, param, "streetaddressEdit")}
        />
      ) : (
        <div>{param.row.streetaddress}</div>
      )}
    </div>
  );
}

export default StreetAddressCell;
