import React, { useState, useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import { addScheduleTimes } from "./utilities/times";
import CourseList from "./components/CourseList";
import { useData } from "./utilities/firebase";

const App = () => {
  const [schedule, loading, error] = useData("/", addScheduleTimes);

  if (!schedule) return <p></p>;

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;
