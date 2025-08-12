import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import InstructorLayout from "./layouts/InstructorLayout.jsx";
import InstructorDashboard from "./pages/dashboard/instructorDashboardPage/InstructorDashboard.jsx";
import CourseManager from "./pages/dashboard/instructorDashboardPage/CourseManager.jsx";
import CourseDetailPage from "./pages/dashboard/instructorDashboardPage/CourseDetailPage.jsx";
import EditCourse from "./pages/dashboard/instructorDashboardPage/EditCourse.jsx";
import CourseCreatePage from "./pages/dashboard/instructorDashboardPage/CourseCreatePage.jsx";
 
import UserProfilePage from "./pages/profile/UserProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Provider } from "react-redux";
import { store } from "./context/redux/store.js";
import LessonEditPage from "./pages/lessons/LessonEditPage.jsx";
import LessonCreatePage from "./pages/lessons/LessonCreatePage.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import BrowseCourse from "./components/dashboard/student/courses/BrowseCourse.jsx";
import StudentDashboard from "./pages/dashboard/studentDashboard/StudentDashboard.jsx";
import BrowseCoursesPage from "./pages/dashboard/studentDashboard/BrowseCoursesPage.jsx";
import MyCoursesPage from "./pages/dashboard/studentDashboard/MyCoursesPage.jsx";
import StudentCourseDetailPage from "./pages/dashboard/studentDashboard/CourseDetailPage.jsx";
import LessonDetailsPage from "./pages/dashboard/studentDashboard/LessonDetailsPage.jsx";
import QuizPage from "./pages/dashboard/studentDashboard/QuizPage.jsx";
import QuizCreatePage from "./pages/dashboard/instructorDashboardPage/QuizCreatePage.jsx";
import QuizManagerPage from "./pages/dashboard/instructorDashboardPage/QuizManagerPage.jsx";
import AllQuizesPage from "./pages/dashboard/studentDashboard/AllQuizesPage.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<p>Home</p>}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path='reset-password' element={<ResetPassword/>}/>

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="browse-courses" element={<BrowseCoursesPage />} />
        <Route path="mycourses" element={<MyCoursesPage />} />
        <Route path="course/:courseId" element={<StudentCourseDetailPage />} />
        <Route path="course/lesson/:lessonId" element={<LessonDetailsPage />} />
        <Route path="course/lesson/quiz/:quizId" element={<QuizPage />} />
        <Route path="quizes" element={<AllQuizesPage/>}/>
      </Route>

      <Route
        path="/instructor"
        element={
          <ProtectedRoute>
            <InstructorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstructorDashboard />} />
        <Route path="courses" element={<CourseManager />} />
        <Route path="course/:courseId/detail" element={<CourseDetailPage />} />
        <Route path="course/:courseId/edit" element={<EditCourse />} />
        <Route path="course/create" element={<CourseCreatePage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route
          path="/instructor/lesson/:lessonId/edit"
          element={<LessonEditPage />}
        />
        <Route
          path="/instructor/course/:courseId/lesson/create"
          element={<LessonCreatePage />}
        />
        <Route path="course/lesson/:lessonId/quiz/create" element={<QuizCreatePage/>} />
        <Route path='quizes' element={<QuizManagerPage/>}/>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
