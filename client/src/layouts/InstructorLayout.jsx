import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Instructor from "../components/sidebars/Instructor";

const InstructorLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
          <Instructor /> 

          <main className="flex flex-1 overflow-y-auto w-[calc(100vw-256px)] bg-gray-200">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default InstructorLayout;
