import React from "react";
import { useSelector } from "react-redux";

function TestPage() {
  const subjects = useSelector((state) => state.courses);

  return (
    <>
      <h2>Courses Trying Pages</h2>
      {subjects
        .slice(0)
        .reverse()
        .map((course) => {
          return <p key={course.id}>{course.title}</p>;
        })}
    </>
  );
}

export default TestPage;
