import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { axiosInstanceForAuth } from "../axios/axiosInstance";
import { ApiEndpoints } from "../config";
import LinearIndeterminate from "../components/loader";


export default function Scholars() {
  const [scholars, setScholars] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchScholars();
  }, []);

  const fetchScholars = async () => {
    try {
      setLoading(true);
      const res = await axiosInstanceForAuth.get(ApiEndpoints.FETCH_ALL_SCHOLARS);
      setScholars(res?.data);
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      {isLoading && <LinearIndeterminate />}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Scholars
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="scholars table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scholars?.map((scholar) => (
                <TableRow key={scholar._id}>
                  <TableCell>{scholar.name}</TableCell>
                  <TableCell>{scholar.email}</TableCell>
                  <TableCell>{scholar.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
