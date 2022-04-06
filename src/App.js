import React, { useState, useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import CourseList, { addScheduleTimes } from "./components/CourseList";

const App = () => {
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(
        "https://courses.cs.northwestern.edu/394/data/cs-courses.php"
      );
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    };

    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;
