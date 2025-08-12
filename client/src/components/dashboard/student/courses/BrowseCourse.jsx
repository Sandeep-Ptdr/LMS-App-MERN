import React, { useEffect, useState } from "react";
import InstructorCourseCard from "../../instructor/course/InstructorCourseCard";
import Card from "./Card";
import useFetchData from "../../../../hooks/useFetchData";
import API from "../../../../utils/api";
const BrowseCourse = () => {
  const { data, loading, error, fetchData } = useFetchData();
  const [axiosError, setAxiosError] = useState(null);
  useEffect(() => {
    fetchData("/courses", "GET");
  }, []);

  // console.log('data',data)

  const handleEnroll = async (courseId, amount) => {
    // fetchData(`/student/createorder`, "POST", {
    //   amount,
    //   courseId,
    // });

    try {
      const res = await API.get("/getkey");
      // console.log('res',res)

      const orderData = await API.post("/student/createorder", {
        amount,
        courseId,
      });

      // console.log("orderData", orderData);


      if (orderData && orderData.data.success) {
        const options = {
          key: res.data.key,
          amount: orderData?.data.order.amount,
          currency: orderData?.data.order.currency,
          order_id: orderData?.data.order.id,
          name: "LMS",
          description: "Test Transaction",
          handler: async (response) => {
            // console.log('response',response)
            await API.post("/student/verifypayment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courseId: courseId,
            });
          },

          prefill: {
            name: "Test User",
            email: "qK9Q1@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },

          theme: {
            color: "#317ffc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        console.log("data is not defined");
      }
    } catch (error) {
      setAxiosError(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">
            Browse Courses
          </h1>
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

        <div className=" flex flex-wrap gap-3 py-4  justify-center sm:justify-normal">
          {loading && (
            <div className="  flex items-center justify-center w-full h-full ">
              {" "}
              <div className="loader"></div>{" "}
            </div>
          )}
          {error && <p>{error?.response?.data?.message || error?.message}</p>}
          {data &&
            data?.courses?.length > 0 &&
            data?.courses.map((course) => (
              <Card course={course} onPayment={handleEnroll} key={course._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default BrowseCourse;
