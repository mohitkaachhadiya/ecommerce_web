import React from "react";
import { Outlet } from "react-router-dom";
import Cart from "../componets/Cart";

const AppLayout = () => (
  <>
    <Cart />
    <Outlet />
  </>
);

export default AppLayout;
