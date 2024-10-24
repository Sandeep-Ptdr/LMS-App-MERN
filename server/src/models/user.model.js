import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlength: [3, "Minimum length of name must be 3."],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true, 
      match: [/.+@.+\..+/, "Please fill a valid email address"],
      validate: [validator.isEmail, "Please enter a valid email."],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minlength: [6, "Minimum length of password must be 6."],
      maxlength: [12, "Maximum length of password is 12"],
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (this.password.length < 6 || this.password.length > 12) {
      throw new Error("Password must be between 6 and 12 characters long.");
    }
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//log in

UserSchema.statics.loginStatic = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email is not registered please SignUp !");
  }

  const passwordIsMatch = await bcrypt.compare(password, user.password);

  if (!passwordIsMatch) {
    throw Error("Incorrect Password.");
  }

  return user;
};

export const User = mongoose.model("User", UserSchema);
export default User;
