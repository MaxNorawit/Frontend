import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './store';
import Product from "./shop";
import SignIn from "./login";
import Register from "./register";
import History from "./history";
import Backend from "./backend";
import Backend2 from "./backend2";
function App() {
  return (
    <div>
      <Provider store={store}>

        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
          <Route path="/backend" element={<Backend />} />
          <Route path="/backend2" element={<Backend2 />} />
          <Route path="*" element={<Product />} />
        </Routes>
        </Provider>
    </div>
  );
}

export default App;
