import React from 'react';

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

interface CoursePart {
  name: string;
  exerciseCount: number;
}


interface CoursePartArray {
  array: CoursePart[]
}

const Content = (parts: CoursePartArray): JSX.Element => {
  return <>
    {parts.array.map(c =>
      <p key={c.name}>
        {c.name} {c.exerciseCount}
      </p>
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
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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