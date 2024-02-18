import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/fullPizza/FullPizza";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes basename="black1ight.github.io/pizza-page/">
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
