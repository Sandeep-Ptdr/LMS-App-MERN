 
import { useEffect, useMemo, useState } from "react";
import API from "../utils/api";

const useFetchData = (url, method = "GET", body = null, headers = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const memoizedHeaders = useMemo(() => headers, [JSON.stringify(headers)]);
  const memoizedBody = useMemo(() => body, [JSON.stringify(body)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let response;

        if (method == "GET") {
          response = await API.get(url);
        } else if (method == "POST") {
          response = await API.post(url, memoizedBody, { headers:memoizedHeaders });
        }

        setData(response.data);
      } catch (error) {
        setError(error?.response || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, memoizedBody]);

  return { data, loading, error };
};

export default useFetchData;
