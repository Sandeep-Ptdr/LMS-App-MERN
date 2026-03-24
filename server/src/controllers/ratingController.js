import Course from "../models/course.model.js"
import Rating from "../models/rating.model.js";


const submitRating = async (req,res) => {

   try {
    const {rating,comment} = req.body;
    const studentId = req.user.userInfo._id;

    const numericRating = Number(rating);
    const trimmedComment = comment?.trim() || "";

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
    }

    const course = await Course.findById(req.params.courseId);

    if(!course) return res.status(404).json({success: false, message:"Course not found"});

    const isEnrolled = course.enrolledStudents.some(
      (student) => student.toString() === studentId.toString()
    );

    if (!isEnrolled && req.user.userInfo.role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "You must be enrolled in this course to rate it",
      });
    }

    const existingRating = await Rating.findOne({course: req.params.courseId, student: studentId });

    let savedRating;

    if(existingRating) {
      existingRating.rating = numericRating;
      existingRating.comment = trimmedComment;
      savedRating = await existingRating.save();
    } else {
      const newRating = new Rating({
          student: studentId,
          course: req.params.courseId,
          rating: numericRating,
          comment: trimmedComment
      });

      savedRating = await newRating.save();
    }

    const allRatings = await Rating.find({course: req.params.courseId})

    const totalRatings = allRatings.length;
    const sumOfRatings = allRatings.reduce(
      (sum, rate) => sum + Number(Array.isArray(rate.rating) ? rate.rating[0] : rate.rating || 0),
      0
    );
    const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

    course.averageRating = Number(averageRating.toFixed(2));
    await course.save();

    res.status(existingRating ? 200 : 201).json({
      success: true,
      message: existingRating
        ? "Rating updated successfully"
        : "Rating added successfully",
      rating: savedRating,
      averageRating: course.averageRating,
    });

   } catch (error) {
    res.status(500).json({
      success: false,
      message:" Failed to add rating ",
      error: error.message,
    });
   }

}

export {submitRating};
