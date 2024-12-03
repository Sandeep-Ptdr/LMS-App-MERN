import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Instructor from "../components/sidebars/Instructor";
import { useState } from "react";

const InstructorLayout = () => {
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
          <Instructor isHamburgerOpen={isHamburgerOpen} />

          <main className="flex flex-1 overflow-y-auto w-[calc(100vw-256px)] bg-gray-200">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default InstructorLayout;
