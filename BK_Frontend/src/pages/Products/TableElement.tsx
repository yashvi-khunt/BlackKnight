import { TableRow, TableCell } from "@mui/material";
import React from "react";

function TableElement({ field, value }) {
  return (
    <TableRow>
      <TableCell>{field}</TableCell>
      <TableCell>{value || "N/A"}</TableCell>
    </TableRow>
  );
}

export default TableElement;
