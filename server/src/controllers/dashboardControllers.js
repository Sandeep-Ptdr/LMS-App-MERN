import Course from "../models/course.model.js";
import User from "../models/user.model.js";

const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.userInfo._id;

    const user = await User.findById(studentId);

    if (!user)
      return res.status(404).json({ success: false, message: " User not found " });    

    const enrolledInCourses = await Course.find({
      enrolledStudents: studentId,
    });

    if (!enrolledInCourses)
      return res
        .status(404)
        .json({
          success: false,
          message: " You are not enrolled in any course ",
        });

        

    res.status(200).json({ success: true, enrolledInCourses, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: " Failed to fetch course " });
  }
};

const getInstructorDashboard = async (req,res) => {

    try {
      const instructorId = req.user.userInfo._id;
  
      const courses = await Course.find({instructor: instructorId}).populate('enrolledStudents','name email');

      const user = await User.findById(instructorId);
      // console.log(user)
  
      if (!courses) {
        return res.status(404).json({success: false, message:" Courses not found "})
      }
  
      //calculate overall data
  
     const totalCourses = courses.length;
     const totalEnrolledStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length,0);
      
    res.status(200).json({success:true, totalCourses, totalEnrolledStudents, courses, user});
  
  
    } catch (error) {
      res.status(500).json({success: false, message: "Failed to fetch dashboard data",error:error.message});
    }
  
  }

export {getStudentDashboard, getInstructorDashboard};