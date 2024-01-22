import React from "react";
import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader";

const MobileAttendence = () => {
  return (
    <>
      <div className="main_content main_content2">
        <ProfileHeader attendence profile />
      </div>
    </>
  );
};
export default MobileAttendence;
