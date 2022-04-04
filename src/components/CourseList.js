import React from "react";

const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.values(courses).map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </div>
);

export default CourseList;

const terms = { F: "Fall", W: "Winter", S: "Spring" };

const getCourseTerm = (course) => terms[course.id.charAt(0)];

const getCourseNumber = (course) => course.id.slice(1, 4);

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">
        {getCourseTerm(course)} CS {getCourseNumber(course)}
      </div>
      <div className="card-text">{course.title}</div>
    </div>
  </div>
);
