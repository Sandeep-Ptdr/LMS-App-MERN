import Course from "../models/course.model.js";
import Transaction from "../models/transactionSchema.js";

const getEarnings = async (req, res) => {
  const InstructorId = req.user.userInfo._id;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  try {
    const instructorCourses = await Course.find({
      instructor: InstructorId,
    }).select("_id");

    const courseIds = instructorCourses.map((course) => course._id);

    const transactions = await Transaction.aggregate([
      {
        $match: {
          status: "success",
          course: { $in: courseIds },
        },
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalEarnings: { $sum: "$amount" },
        },
      },
    ]);

    const earnings = months.map((month, index) => {
        const monthData = transactions.find(t => t._id.month === index + 1);
        return{
            month: month.slice(0, 3),
            earnings: monthData ? monthData.totalEarnings : 0
        }
    });

    if(!earnings.length) return res.status(200).json({success: true, earnings: 0})

     res.status(200).json({
       success: true,
       earnings,
     });
     

  } catch (error) {
    console.log("errorrrr: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch earnings",
      error: error.message,
    });
  }
};

export { getEarnings };
