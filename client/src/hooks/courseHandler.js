import { useState } from "react";
import API from "../utils/api";
import axios from "axios";
import { useParams } from "react-router-dom";


export const  useEditCourse = () => {
  const params = useParams()
  const [dataa, setDataa] = useState([]);
  const [loadingg, setLoadingg] = useState(false);
  const [errorr, setErrorr] = useState(null);

  const editCourse = async (formData) => {
    try {
      console.log('formdata',formData)
      setLoadingg(true)
      const response = await axios({
          method: "PUT",
          url:`https://lms-app-mern.onrender.com/api/v1/instructor/course/${params.courseId}/edit`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          },
          data:formData
        },
      );
      setDataa(response.data);
    } catch (error) {
      setErrorr(error?.response?.message || "Something went wrong");
    } finally {
      setLoadingg(false);
    }
  }

  return { dataa, loadingg, errorr, editCourse };
};
