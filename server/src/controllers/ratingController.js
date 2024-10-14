import Course from "../models/course.model.js"
import Rating from "../models/rating.model.js";


const submitRating = async (req,res) => {

   try {
    const {rating,comment} = req.body;
    const studentId = req.user.userInfo._id;

    const course = await Course.findById(req.params.courseId);

    if(!course) return res.status(404).json({success: false, message:"Course not found"});


    const existingRating = await Rating.findOne({course: req.params.courseId, student: studentId });

    if(existingRating) return res.status(400).json({success: false, message: "You have already rated this course "})

    
    const newRating = new Rating({
        student: studentId,
        course: req.params.courseId,
        rating,
        comment
    })

    await newRating.save();

    const allRatings = await Rating.find({course: req.params.courseId})

    const totalRatings = allRatings.length;
    const sumOfRatings = allRatings.reduce((sum, rate) => sum + rate.rating, 0);
    const averageRating = sumOfRatings / totalRatings;

    course.averageRating = averageRating.toFixed(2);
    await course.save();

    res.status(201).json({success: true, message:" Rating added successfully ",  rating: newRating ,averageRating});

   } catch (error) {
    res.status(500).json({success: false, message:" Failed to add rating "});
   }

}

export {submitRating};