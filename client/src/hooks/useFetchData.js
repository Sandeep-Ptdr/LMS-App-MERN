import { useEffect, useMemo, useState } from "react";
import API from "../utils/api";
import axios, { AxiosError } from "axios";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async (url, method, formData = null) => {

    console.log('url',url,'method',method,'formData',formData)
    try {
      setLoading(true);

      let response;

      if (method == "GET") {
        response = await API.get(url);
      } else if (method == "POST") {
        response = await axios({
          method: "POST",
          url: `http://localhost:3000/api/v1${url}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: formData,
        });
      } else if (method === "PUT") {
        response = await axios({
          method: "PUT",
          url: `http://localhost:3000/api/v1${url}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: formData,
        });
      } else if(method === "DELETE") {
        response = await axios({
          method: "DELETE",
          url: `http://localhost:3000/api/v1${url}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
      }

      setData(response.data);
    } catch (error) {
      console.log(error,'errrorrr')
      if(error.message === 'Network Error'){
        return setError(error)
      }
      setError(error?.response || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchData;
