import model from "./model.js";

export const findEnrollmentsByCourse = async (courseId) => {
  const enrollments = await model.find({ 
    course: courseId,
    status: "ENROLLED"
  }).populate("user");
  return enrollments;
};

export const createEnrollment = async (enrollment) => {

  const existing = await model.findOne({
    user: enrollment.user,
    course: enrollment.course
  });

  if (existing) {
    if (existing.status === "ENROLLED") {
      return existing;
    }

    existing.status = "ENROLLED";
    return await existing.save();
  }

  return await model.create({
    ...enrollment,
    status: "ENROLLED"
  });
};

export const isUserEnrolled = async (userId, courseId) => {
  const enrollment = await model.findOne({ 
    user: userId, 
    course: courseId,
    status: "ENROLLED"
  });
  return enrollment !== null;
};

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ 
    user: userId,
    status: "ENROLLED"
  }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ 
    course: courseId,
    status: "ENROLLED"
  }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(user, course) {

  return await model.findOneAndUpdate(
    { user, course },
    { 
      $set: { status: "ENROLLED" }
    },
    { 
      upsert: true,
      new: true
    }
  );
}

export async function unenrollUserFromCourse(user, course) {
  return await model.findOneAndUpdate(
    { user, course },
    { 
      $set: { status: "DROPPED" }
    },
    { new: true }
  );
}