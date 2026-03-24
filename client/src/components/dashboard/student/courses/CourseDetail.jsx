import React, { useEffect, useMemo, useState } from "react";
import {
  IoIosStarOutline,
  IoMdStar,
} from "react-icons/io";
import useFetchData from "../../../../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../../utils/api";
import { toast, Toaster } from "react-hot-toast";

const CourseDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading, error, fetchData } = useFetchData();
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData(`/student/course/${params.courseId}`, "GET");
  }, [params.courseId]);

  useEffect(() => {
    if (data?.userRating) {
      setSelectedRating(Number(data.userRating.rating) || 0);
      setComment(data.userRating.comment || "");
    }
  }, [data?.userRating]);

  const ratings = Array.isArray(data?.ratings) ? data.ratings : [];
  const averageRating = Number(data?.course?.averageRating || 0);
  const ratingCount = ratings.length;
  const instructorNames = data?.course?.instructor?.length
    ? data.course.instructor
        .map(
          (instructor) =>
            instructor.name.charAt(0).toUpperCase() + instructor.name.slice(1)
        )
        .join(", ")
    : "Instructor";

  const ratingSummary = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    ratings.forEach((item) => {
      const value = Number(item?.rating || 0);
      if (counts[value] !== undefined) counts[value] += 1;
    });

    return counts;
  }, [ratings]);

  const renderStars = (value, interactive = false, onSelect) =>
    Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const filled = starValue <= value;

      return (
        <button
          key={starValue}
          type="button"
          className={interactive ? "transition-transform hover:scale-110" : "cursor-default"}
          onClick={interactive && onSelect ? () => onSelect(starValue) : undefined}
        >
          {filled ? (
            <IoMdStar className="text-xl text-yellow-500" />
          ) : (
            <IoIosStarOutline className="text-xl text-yellow-500" />
          )}
        </button>
      );
    });

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    if (!selectedRating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);
      const response = await API.post(`/student/course/${params.courseId}/rate`, {
        rating: selectedRating,
        comment,
      });

      toast.success(response?.data?.message || "Rating submitted");
      await fetchData(`/student/course/${params.courseId}`, "GET");
    } catch (submitError) {
      toast.error(
        submitError?.response?.data?.message || submitError?.message || "Failed to submit rating"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // console.log("data", data.course?.content);

  return (
    <div className="container px-4 mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className=" font-semibold text-2xl text-gray-700 mb-4 ">Course</h1>
      <div className="sm:flex w-full gap-4">
        <div className="w-full sm:w-8/12">
          <div className="bg-gray-50 shadow-md rounded-md mb-4 overflow-hidden">
            {data?.course?.content && (
              <video className="w-full h-5/6" controls>
                <source src={data?.course?.content} type="video/mp4" />
              </video>
            )}
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-700">
                {data?.course?.title}
              </h1>
              <p className="text-sm font-medium text-gray-600">
                {data?.course?.description}
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-50 shadow-md rounded-md mb-4 ">
            <div>
              {loading && <p>Loading...</p>}
              {error && <p>{error?.data?.message || error?.message}</p>}
              <ul>
                {data && data?.lessons?.length > 0
                  ? data.lessons.map((lesson) => (
                      <li
                        onClick={() =>
                          navigate(`/student/course/lesson/${lesson._id}`)
                        }
                        className="list-decimal list-inside p-2 border-b border-gray-300 text-gray-600 font-medium cursor-pointer"
                        key={lesson._id}
                      >
                        {lesson.title}
                      </li>
                    ))
                  : !loading && !error && <p> No Lessons found!</p>}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-4/12 ">
          <div className="bg-gray-50 rounded-md shadow-md mb-4 w-full p-4 flex flex-col items-center gap-1">
            <span className="text-xl font-semibold text-gray-600">
              Rs. {data?.course?.price || 0}
            </span>
            <button
              className="bg-[#2196F3] hover:bg-[#1976D2] transition-colors duration-100 text-gray-50 text-lg font-medium w-full py-2 rounded-md"
              onClick={() => navigate(`/student/course/lesson/${data?.lessons?.[0]?._id}`)}
              disabled={!data?.lessons?.length}
            >
              {data?.lessons?.length ? "Start Learning" : "No Lessons Yet"}
            </button>
          </div>
          <div className="bg-gray-50 rounded-md shadow-md mb-4 w-full">
            <div className=" w-full flex p-4 border-b border-gray-300">
              <div className="border border-gray-300 w-14 h-14 rounded-full overflow-hidden">
                <img
                  src="https://via.placeholder.com/1200x600"
                  alt=""
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="ml-4 ">
                <h1 className="font-semibold text-lg text-gray-600">
                  {instructorNames}
                </h1>
                <span className="text-sm font-medium text-gray-500">
                  Instructor
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, ex
                reprehenderit et nobis voluptatibus voluptates delectus!
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-50 rounded-md shadow-md">
            <div className="p-4 border-b border-gray-300 ">
              <h1 className="font-semibold text-xl text-gray-600">Ratings</h1>
            </div>
            <div className="p-4">
              <div className="mb-5 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-800">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="flex">{renderStars(Math.round(averageRating))}</span>
                </div>
                <p className="text-sm font-medium text-gray-500">
                  {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
                </p>
                <div className="mt-4 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingSummary[star] || 0;
                    const percentage = ratingCount ? (count / ratingCount) * 100 : 0;

                    return (
                      <div key={star} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-6">{star}</span>
                        <IoMdStar className="text-yellow-500" />
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-yellow-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form className="mb-5 rounded-xl bg-white p-4 shadow-sm" onSubmit={handleSubmitRating}>
                <h2 className="mb-3 text-lg font-semibold text-gray-700">
                  {data?.userRating ? "Update Your Rating" : "Rate This Course"}
                </h2>
                <div className="mb-3 flex gap-1">
                  {renderStars(selectedRating, true, setSelectedRating)}
                </div>
                <textarea
                  className="min-h-24 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-700 outline-none focus:border-[#2196F3]"
                  placeholder="Share what you liked about this course"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-3 w-full rounded-md bg-[#2196F3] px-4 py-2 text-sm font-bold text-white hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {submitting ? "Saving..." : data?.userRating ? "Update Rating" : "Submit Rating"}
                </button>
              </form>

              <div className="space-y-3">
                {ratings.length > 0 ? (
                  ratings.map((rating) => (
                    <div key={rating._id} className="rounded-xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-700">
                            {rating?.student?.name || "Student"}
                          </h3>
                          <span className="flex">
                            {renderStars(Number(rating?.rating || 0))}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-gray-600">
                        {rating?.comment || "No written review provided."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-medium text-gray-500">
                    No ratings yet. Be the first to review this course.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
