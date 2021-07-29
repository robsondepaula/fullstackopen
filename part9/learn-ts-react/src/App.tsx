import React from 'react';

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDesc {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface CoursePartArray {
  array: CoursePart[]
}

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.type) {
    case "normal":
      return <p key={part.name}>
        {part.name} {part.exerciseCount}
        <br />
        {part.description}
      </p>
    case "groupProject":
      return <p key={part.name}>
        {part.name} {part.exerciseCount}
        <br />
        project exercises{" "}{part.groupProjectCount}
      </p>
    case "submission":
      return <p key={part.name}>
        {part.name} {part.exerciseCount}
        <br />
        {part.description}
        <br />
        submit to{" "}{part.exerciseSubmissionLink}
      </p>
    case "special":
      return <p key={part.name}>
        {part.name} {part.exerciseCount}
        <br />
        {part.description}
        <br />
        required skills{" "}{part.requirements.map(r => `${r} `)}
      </p>
    default:
      break;
  }
  return <></>
}

const Content = (parts: CoursePartArray): JSX.Element => {
  return <>
    {parts.array.map(c =>
      <Part key={c.name} part={c} />
    )}
  </>;
}

const Total = ({ total }: { total: number }) => {
  return <p>Number of exercises{" "}{total}</p>;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content array={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;