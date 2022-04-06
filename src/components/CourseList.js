import React, { useState } from "react";
import TermSelector from "./TermSelector";
import { getCourseTerm } from "../utilities/times";
import Course from "./Course";

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState("Fall");
  const termCourses = Object.values(courses).filter(
    (course) => term === getCourseTerm(course)
  );
  const [selected, setSelected] = useState([]);

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />

      <div className="course-list">
        {termCourses.map((course) => (
          <Course
            key={course.id}
            course={course}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  );
};

export default CourseList;
