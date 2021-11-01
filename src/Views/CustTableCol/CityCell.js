import React from "react";
import TextField from "@mui/material/TextField";
//custom action cell column
function CityCell({ param,editRowHandler }) {
  return (
    <div>
      {param.row.isEdit ? (
        <TextField
          id={`CityCellEdit-${param.row.id}`}
          variant="standard"
          value={param.row.cityEdit}
          onChangeCapture={(e) => editRowHandler(e, param, "cityEdit")}
        />
      ) : (
        <div>{param.row.city}</div>
      )}
    </div>
  );
}

export default CityCell;
