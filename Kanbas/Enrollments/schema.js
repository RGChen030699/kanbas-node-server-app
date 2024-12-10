import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
  { 
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString()},
    course: { type: String, ref: "CourseModel" },
    user: { type: String, ref: "UserModel" },
    grade: Number,
    letterGrade: String,
    enrollmentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
    },
  },
  { 
    collection: "enrollments",
    timestamps: true 
  }
);
export default enrollmentSchema;