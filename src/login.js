import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import Nevbar from "./nev";
const MySwal = withReactContent(Swal);

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Norawit Wongsopa "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [check, setCheck] = useState(true);

  const dispatch = useDispatch();

  async function getData() {
      const data = localStorage.getItem("token");
      if (!data) {
        setCheck(false);
      }else{
        navigate("/");
      }
  }

  useEffect(() => {
    getData();
  }, []);



  const login = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post("https://amused-ray-nightgown.cyclic.app/login", {
        username: username,
        password: password,
      });
      //console.log(res);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        Axios.defaults.headers.post["Content-Type"] = "application/json";
        const res1 = await Axios.get("https://amused-ray-nightgown.cyclic.app/me");
        dispatch({ type: "FETCHDATA", payload: await res1.data.message });
        await MySwal.fire("Success", "เข้าสู่ระบบสำเร็จ", "success");
        await navigate("/");
      } else {
        MySwal.fire("Oops...", "เกิดข้อผิดพลาดไม่ทราบสาเหตุ", "error");
      }
    } catch (err) {
      MySwal.fire("Oops...", err.response.data.message, "error");
    }
  };

  return !check ? (
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
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <form onSubmit={login}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อผู้ใช้"
                name="username"
                autoComplete="username"
                onChange={(event) => {
                  setusername(event.target.value);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน "
                type="password"
                id="password"
                autoComplete="password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าสู่ระบบ
              </Button>
            </form>
            <Grid container>
              <Grid item>
                <Link to="/register">{"ไม่มีบัญชี? สมัครสมาขิก"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  ) : (
    <div>

    </div>
  );
}