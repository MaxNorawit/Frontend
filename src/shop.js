import { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Nevbar from "./nev";
const MySwal = withReactContent(Swal);

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productList, setproductList] = useState([]);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const counter = useSelector((state) => state.counter);
  function getproduct() {
    Axios.get("https://amused-ray-nightgown.cyclic.app/app/product").then(
      (response) => {
        if (response.data <= 0) {
          setIsOutOfStock(true);
        } else {
          setproductList(response.data);
        }
      }
    );
  }

  async function getData() {
    try {
      const data = localStorage.getItem("token");
      if (data) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
        Axios.defaults.headers.post["Content-Type"] = "application/json";
        const res1 = await Axios.get("https://amused-ray-nightgown.cyclic.app/me");
        await dispatch({ type: "FETCHDATA", payload: await res1.data.message });
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
    getproduct();
    getData();
    //getData();
  }, []);

  // async function getData() {
  //   const data = localStorage.getItem("token");
  //   Axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
  //   Axios.defaults.headers.post["Content-Type"] = "application/json";
  //   const res1 = await Axios.get("https://amused-ray-nightgown.cyclic.app/me");
  //   dispatch({ type: "FETCHDATA", payload: await res1.data.message });
  // }

  const buy = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      await MySwal.fire("error", "กรุณาข้าสู่ระบบ", "error");
      await navigate("/login");
    } else {
      try {
        const res = await Axios.get(
          "https://amused-ray-nightgown.cyclic.app/buy/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        getproduct();
        await MySwal.fire("Success", res.data.message, "success");
        await navigate("/history");
      } catch (err) {
        if (err.response.data.status === "jwt") {
          await localStorage.removeItem("token");
          await MySwal.fire("Oops...", err.response.data.message, "error");
          return await navigate("/login");
        } else {
          return MySwal.fire("Oops...", err.response.data.message, "error");
        }
      }
    }
  };

  const del = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      await MySwal.fire("error", "กรุณาข้าสู่ระบบ", "error");
      await navigate("/login");
    } else {
      try {
        const res = await Axios.get(
          "https://amused-ray-nightgown.cyclic.app/delet/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        getproduct();
        await MySwal.fire("Success", res.data.message, "success");
        await navigate("/");
      } catch (err) {
        if (err.response.data.status === "jwt") {
          await localStorage.removeItem("token");
          await MySwal.fire("Oops...", err.response.data.message, "error");
          return await navigate("/login");
        } else {
          return MySwal.fire("Oops...", err.response.data.message, "error");
        }
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Nevbar />
      <Box sx={{ width: "100%" }}>
        {isOutOfStock ? (
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            สินค้าหมด
          </Typography>
        ) : (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          >
            {productList.map((val, key) => (
              <Grid item xs={3}>
                <Card sx={{ width: "100%" }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={val.img}
                    title="green iguana"
                  />
                  <CardContent>
                    <center>
                      <Typography gutterBottom variant="h5" component="div">
                        {val.product}
                      </Typography>
                    </center>
                    <Typography variant="body2" color="text.secondary">
                      ราคา: {val.price} บาท
                    </Typography>
                  </CardContent>
                  <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => buy(val.id)}
                    >
                      สั่งซื้อ
                    </Button>
                    {counter.rank == 1 ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => del(val.id)}
                        sx={{ml:1}}
                      >
                        ลบ
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Product;
