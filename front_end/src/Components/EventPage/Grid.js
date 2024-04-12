import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#289cfa",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function CustomizedTables({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Actions</StyledTableCell>
            <StyledTableCell>Event Name</StyledTableCell>
            <StyledTableCell align="left">Event type</StyledTableCell>
            <StyledTableCell align="left">No of Participants</StyledTableCell>
            <StyledTableCell align="left">Discription</StyledTableCell>
            <StyledTableCell align="left">Creation Date</StyledTableCell>
            <StyledTableCell align="left">Is Generated?</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <StyledTableRow key={row.EventName}>
              <StyledTableCell align="left">
                <IconButton>
                  <EditIcon fontSize="20" />
                </IconButton>
              </StyledTableCell>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell component="th" scope="row" align="left">{row.EventName}</StyledTableCell>
              <StyledTableCell align="left">{row.EventType}</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left">{row.Description}</StyledTableCell>
              <StyledTableCell align="left">{row.CreationDate}</StyledTableCell>
              <StyledTableCell align="left">{row.isGenerated}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
