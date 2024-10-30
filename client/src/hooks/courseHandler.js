import { useState } from "react";
import API from "../utils/api";
import axios from "axios";

export const createCourse = async (formData) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  try {
    const response = await axios(
      "http://localhost:3000/api/v1/instructor/course/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      }
    );
    setData(response.data);
  } catch (error) {
    setError(error?.response?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }

  return { data, loading, error };
};
