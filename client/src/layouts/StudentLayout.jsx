import React, { useState } from "react";
import Student from "../components/sidebars/Student";
import Header from "../components/common/Header";
import StudentDashboard from "../pages/dashboard/studentDashboard/StudentDashboard";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const hamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header setHamburger={hamburger} />
        <div className="flex flex-1 overflow-hidden">
          {/* sidebar */}
          <Student isHamburgerOpen={isHamburgerOpen} />

          <main className="flex flex-1 overflow-y-auto w-[calc(100vw-256px)] bg-gray-200">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default StudentLayout;
