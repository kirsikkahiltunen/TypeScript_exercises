const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}
];

const Part = ({ part }: { part: CoursePart}) => {
    switch (part.kind) {
      case "basic":
        return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>
            {part.description}
          </p>
        </div>
        )
      case "group":
        return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>
            project exercises {part.groupProjectCount}
          </p>
        </div>
        )
      case "background":
        return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>
            {part.description}
          </p>
          <p>
            {part.backgroundMaterial}
          </p>
        </div>
        )
      case "special":
        return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
          </p>
          <p>
            {part.description}
          </p>
          <p>
            required skils: {part.requirements.join(', ')}
          </p>
        </div>
        )
  }
}

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  type HeaderProps = {
    name: string;
  }

  type ContentProps = {
    courseParts: CoursePart[];
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
        {courseParts.map((part) => (
          <Part part={part} key={part.name}/>
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