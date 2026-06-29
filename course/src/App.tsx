import type { JSX } from "react/jsx-runtime";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
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

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  type HeaderProps = {
    name: string;
  }

  type ContentProps = {
    courseParts: CoursePart[];
  }

  type CoursePart = {
    name: string;
    exerciseCount: number;
  }

  type TotalProps = {
    totalExercises: number;
  }

  const Header = ({ name }: HeaderProps) => {
    return <h1>{name}</h1>
  }

  const Content = ({ courseParts }: ContentProps) => {
    return (
      <div>
        {courseParts.map((course) => (
          <p key={course}>
            {course.name} {course.exerciseCount}
          </p>
        ))}
      </div>
    )
  }

  const Total = ({ totalExercises }: TotalProps) => {
    return (
      <div>
        <p>
          Number of exercises {totalExercises}
        </p>
      </div>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;