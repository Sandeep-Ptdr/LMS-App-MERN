import Progress from "../models/progress.model"



const updateProgress = async (req, res) => {
    const {courseId, lessonId} = req.body
    const studentId = req.user.userInfo._id

    try {
        
        if(!courseId || !lessonId) return res.status(400).json({success: false, message: "Course id and lesson id is required"})

        const progress = await Progress.findByIdAndUpdate({student: studentId, course: courseId},
            {
                $addToSet: {completedLessons: lessonId},
                $set: {lastAccessedLesson: lessonId, lastAccessed: Date.now()},
            },
            {upsert: true, new: true}
        )

        res.status(200).json({success: true, message: "Progress updated successfully", progress})

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update progress",
            error: error.message,
        })
        
    }
}

export default {updateProgress}