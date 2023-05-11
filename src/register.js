import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

export default function Register() {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [email, setemail] = useState("");

  const [check, setCheck] = useState(true);

  async function getData() {
    const data = localStorage.getItem("token");
    if (!data) {
      setCheck(false);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const addregister = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post("https://amused-ray-nightgown.cyclic.app/register", {
        user: user,
        password: password,
        password2: password2,
        email: email,
      });
      //console.log(res);
      if (res.data.status === "success") {
        await MySwal.fire("Success", "สมัครสมาชิกสำเร็จ", "success");
        await navigate("/login");
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
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            สมัครสมาชิก
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <form onSubmit={addregister}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="ชื่อผู้ใช้ "
                    onChange={(event) => {
                      setuser(event.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="รหัสผ่าน "
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password2"
                    label="ยืนยันรหัสผ่าน "
                    type="password"
                    id="password2"
                    autoComplete="new-password"
                    onChange={(event) => {
                      setpassword2(event.target.value);
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
                สมัครสมาชิก
              </Button>
            </form>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  ) : (
    <div>

    </div>
  );
}
