import React from "react";
import SideBar from "../../components/Sidebar";
import Header from "../../components/Header";
import CalenderBar from "../../components/CalenderBar";
import ClientHeader from "../../components/ClientHeader";
import { Outlet, useLocation } from "react-router-dom";

const Client = () => {
  const location = useLocation();
  return (
    <>
      {/* <Header />
      <SideBar /> */}
      <div className="main_content">
        <div style={{ width: "100%", paddingRight: "20px" }}>
          <ClientHeader  title="View Client"  />
          <div>
            <Outlet />
          </div>
        </div>
        {location.pathname == "/MyProfile/Client/ViewClient" && <CalenderBar />}
      </div>
    </>
  );
};
export default Client;
