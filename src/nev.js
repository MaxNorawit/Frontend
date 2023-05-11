import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useState, useEffect } from "react";
import Axios from "axios";
import Container from "@mui/material/Container";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Nevbar(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [islogin, setislogin] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const navigate = useNavigate();

  async function logout() {
    await localStorage.removeItem("token");
    await dispatch({ type: "FETCHDATA", payload: {} });
    await navigate("/login");
  }

  async function login() {
    await navigate("/login");
  }

  async function register() {
    await navigate("/register");
  }

  async function history() {
    await navigate("/history");
  }

  async function backend() {
    await navigate("/backend");
  }

  async function home() {
    await navigate("/");
  }


  async function getData() {
    try {
      const data = localStorage.getItem("token");
      if (data) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
        Axios.defaults.headers.post["Content-Type"] = "application/json";
        const res1 = await Axios.get("https://amused-ray-nightgown.cyclic.app/me");
        await dispatch({ type: "FETCHDATA", payload: await res1.data.message });
        await setislogin(true);
      } else {
        await localStorage.removeItem("token");
        await dispatch({ type: "FETCHDATA", payload: {} });
      }
    } catch (err) {
      await localStorage.removeItem("token");
      await dispatch({ type: "FETCHDATA", payload: {} });
      await navigate("/login");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Shop <Button color="inherit" onClick={home} sx={{ml:2}}>หน้าแรก</Button>
          </Typography>
          {islogin ? (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button aria-label="delete" sx={{ color: "#fff" }}>
                <MonetizationOnIcon sx={{ mr: 1 }} /> {counter.point} ฿
              </Button>
              <Button
                sx={{ color: "#fff" }}
                id="username"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleIcon sx={{ mr: 1 }} />
                {counter.username}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "username",
                }}
              >
                {counter.rank == 1 ? (
                <MenuItem onClick={backend}>จัดการหลังบ้าน</MenuItem>
                ) : (
                  <div></div>
                )}
                <MenuItem onClick={history}>ประวัติการซื้อ</MenuItem>
                <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
              </Menu>
            </Box>
          ) : <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button color="inherit" onClick={login}>เข้าสู่ระบบ</Button>
              <Button color="inherit" onClick={register}>สมัครสมาชิก</Button>
        </Box>}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </Box>
    </Container>
  );
}
