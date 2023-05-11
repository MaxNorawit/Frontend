import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Nevbar from "./nev";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();

  const [datalist, setdatalist] = useState([]);
  async function getData() {
    try {
      const data = localStorage.getItem("token");
      if (data) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
        Axios.defaults.headers.post["Content-Type"] = "application/json";
        const res1 = await Axios.get("https://amused-ray-nightgown.cyclic.app/history");
        setdatalist(res1.data);
      } else {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Nevbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>รายการ</TableCell>
              <TableCell align="center">รูป</TableCell>
              <TableCell align="right">รายละอียด</TableCell>
              <TableCell align="right">ราคา</TableCell>
              <TableCell align="right">เวลา</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datalist.map((row, key) => (
              <TableRow
                key={row.product}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.product}
                </TableCell>
                <TableCell align="center">
                  <img
                    src={row.img}
                    alt={row.img}
                    loading="lazy"
                    style={{ width: '100px', height: '100px' }} />
                </TableCell>
                <TableCell align="right">{row.ans}</TableCell>
                <TableCell align="right">{row.price} บาท</TableCell>
                <TableCell align="right">{row.timeout}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
