import React from "react";
import { Routes, Route } from "react-router-dom";
import Authpage from "../pages/Authpage";
import Testpage from "../pages/Testpage";
import Homepage from "../pages/Homepage";
import Pollpage from "../pages/Pollpage";

const RouteViews = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Authpage authType="login" />} />
        <Route path="register" element={<Authpage authType="register" />} />
        <Route path="polls/:id" element={<Pollpage />} />
        <Route path="test" element={<Testpage />} />
      </Routes>
    </main>
  );
};

export default RouteViews;
