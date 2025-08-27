import { CheckCheck } from "lucide-react";

const CourseOverView = ({ course }) => {
  // Ensure learning is always an array
  const learningArray = Array.isArray(course?.learning) ? course.learning : [];

  return (
    <>
      <h3 className="text-2xl">Course Description</h3>
      <p className="mt-4">{course?.description || "No description available."}</p>

      <div className="bg-gray-50 space-y-6 p-8 rounded-md mt-8">
        <h4 className="text-2xl">What You Will Learn?</h4>
        <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          {learningArray.length > 0 ? (
            learningArray.map((learning, index) => (
              <li key={index} className="flex space-x-3">
                <div className="flex-none relative top-1">
                  <CheckCheck />
                </div>
                <div className="flex-1">{learning}</div>
              </li>
            ))
          ) : (
            <li>No learning points available.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CourseOverView;
