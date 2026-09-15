import { useId } from "react";

const Header = (props) => <h2>{props.course}</h2>;

const Content = (props) => (
  <div>
    {props.parts.map((part, index) => (
      <Part part={part} key={`${props.baseId}-${index}`} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name}: {props.part.exercises}
  </p>
);

const Total = (props) => (
  <p>
    <b>Total number of exercises: {props.total}</b>
  </p>
);

const Course = ({ course }) => {
  const baseId = useId();
  console.log(baseId);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} baseId={baseId} />
      <Total
        total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </>
  );
};

export default Course;
