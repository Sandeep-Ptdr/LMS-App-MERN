import Course from "../models/course.model.js";

const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.userInfo._id;

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

        

    res.status(200).json({ success: true, enrolledInCourses });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: " Failed to fetch course " });
  }
};

const getInstructorDashboard = async (req,res) => {

    try {
      const instructorId = req.user.userInfo._id;
  
      const courses = await Course.find({instructor: instructorId}).populate('enrolledStudents','name');
  
      if (!courses) {
        return res.status(404).json({success: false, message:" Courses not found "})
      }
  
      //calculate overall data
  
     const totalCourses = courses.length;
     const totalEnrolledStudents = courses.reduce((sum, course) => sum + course.enrolledStudents.length,0);
      
    res.status(200).json({success:true, totalCourses, totalEnrolledStudents, courses});
  
  
    } catch (error) {
      res.status(500).json({success: false, message: "Failed to fetch dashboard data",error:error.message});
    }
  
  }

export {getStudentDashboard, getInstructorDashboard};