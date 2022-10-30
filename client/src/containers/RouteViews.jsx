import React from "react";
import { Routes, Route } from "react-router-dom";
import Authpage from "../pages/Authpage";

const RouteViews = () => {
  return (
    <main>
      <Routes>
        <Route path="login" element={<Authpage authType="login" />} />
        <Route path="register" element={<Authpage authType="register" />} />
      </Routes>
    </main>
  );
};

export default RouteViews;
