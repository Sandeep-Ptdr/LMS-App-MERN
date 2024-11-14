import React from "react";
import InstructorCourseCard from "../../instructor/course/InstructorCourseCard";
import Card from "./Card";
import useFetchData from "../../../../hooks/useFetchData";
import API from "../../../../utils/api";
const BrowseCourse = () => {
  const { data, loading, error, fetchData } = useFetchData();

  const handleEnroll = async () => {

    const res = await API.get('/getkey');
    

    fetchData(`/student/createorder`, "POST", {
      amount: 99,
    });
    console.log(data)

    if (data && data.success){
      const options = {
        key: res.data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "LMS",
        description: "Test Transaction",
        order_id: data.order.id,
        callback_url: "http://localhost:3000/api/v1/student/verifypayment",
        prefill: {
          name: "Test User",
          email: "qK9Q1@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
  
        theme: {
          color: "#3399cc",
        },
      };
  
      const razorpay = new window.Razorpay(options);
       razorpay.open();
    } else {
      console.log('data is not defined');
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error?.data?.message || "something went wrong"}</h1>;

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
            Browse Courses
          </h1>

          {/* <Link to="/instructor/course/create">
          <button className="flex gap-1 font-semibold text-base text-gray-50 justify-center items-center bg-[#2196F3] hover:bg-[#3286cb] px-4 py-2 rounded-md">
            <IoMdAdd className="text-2xl font-bold" /> Add Course
          </button>
        </Link> */}
        </div>

        <div className="flex justify-between p-4  bg-gray-50 rounded-md border-l-[3px]  border-l-[#2196F3] shadow-lg mb-4">
          {/* <FilterBtn
          categories={filters.categories}
          statuses={filters.statuses}
        /> */}

          <div className="w-[85%]">
            <form
              className="flex gap-2 "
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                placeholder="Search courses"
                type="text"
                //   value={searchInput}
                //   onChange={(e) => setSearchInput(e.target.value)}
                className="py-2 px-3 w-full border border-gray-300 rounded-lg outline-none focus:border-[#2196F3]"
              />
            </form>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 py-4  justify-center sm:justify-normal">
          <Card data={data} onPayment={handleEnroll} />
          <Card data={data} onPayment={handleEnroll} />
          <Card data={data} onPayment={handleEnroll} />
        </div>
      </div>
    </>
  );
};

export default BrowseCourse;
