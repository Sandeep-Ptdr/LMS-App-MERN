import mongoose from "mongoose";
 

const ratingSchema = new mongoose.Schema({
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    rating: [{
        type: Number,
        required: true,
        min:[1,"Minimum value of rating must be 1"],
        max: [5,"Maximum value of rating must be 5"]
    }],
    comment: {
        type: String
    }
},{timestamps: true});

const Rating = mongoose.model('Rating',ratingSchema);

export default Rating;

 