import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import db from "./firebase";
import { useState } from "react";
import { useEffect } from "react";

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [info, setInfo] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 250 },
    {
      id: "email",
      label: "Email",
      minWidth: 250,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "phone",
      label: "Phone Number",
      minWidth: 250,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(name, phone, email) {
    return { name, phone, email };
  }

  const rows = [];

  for (let i = 0; i < info.length; i++) {
    rows.push(createData(info[i].name, info[i].phone, info[i].email));
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   window.addEventListener("load", () => {
  //     Fetchdata();
  //   });

  useEffect(() => {
    Fetchdata();
  }, []);

  const Fetchdata = () => {
    db.collection("db2")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setInfo((arr) => [...arr, data]);
        });
      });
  };

  console.log(info, "info");

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
