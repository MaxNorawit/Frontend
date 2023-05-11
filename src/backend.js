import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nevbar from "./nev";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const MySwal = withReactContent(Swal);
const theme = createTheme();

export default function Backend() {

  const [product, seteproduct] = useState("");
  const [img, setimg] = useState("");
  const [price, setprice] = useState("");
  const [detial, setdetial] = useState("");

  const navigate = useNavigate();

  const insertdata = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post("https://amused-ray-nightgown.cyclic.app/addproduct", {
        product: product,
        img: img,
        price: price,
        detial: detial,
      });
      if (res.data.status === "success") {
        await MySwal.fire("Success", "เพิ่มสินค้าสำเร็จ", "success");
        await navigate("/");
      } else {
        MySwal.fire("Oops...", "เกิดข้อผิดพลาดไม่ทราบสาเหตุ", "error");
      }
    } catch (err) {
      MySwal.fire("Oops...", err.response.data.message, "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Nevbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เพิ่มสินค้า
          </Typography>
          <form onSubmit={insertdata}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="ชื่อสินค้า"
                  type="text"
                  id="name"
                  onChange={(event) => {
                    seteproduct(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="img"
                  label="รูปภาพ"
                  name="img"
                  onChange={(event) => {
                    setimg(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="ราคา"
                  type="number"
                  id="price"
                  onChange={(event) => {
                    setprice(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="detial"
                  label="รายละเอียดสินค้า"
                  type="text"
                  id="detial"
                  onChange={(event) => {
                    setdetial(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เพิ่มสินค้า
            </Button>
          </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
