import { CoursePart } from '../App';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart: CoursePart
}

const Part = ({coursePart}: PartProps) => {

  const headingStyle = {
    fontWeight: "bold"
  }
  const courseStyle = {
    marginTop: "2rem",
    marginBottom: "2rem",
  }
  const descriptionStyle = {
    fontStyle: "italic"
  }

  switch(coursePart.kind) {
    case "basic":
      return (
        <div style={courseStyle}>
         <p style={headingStyle}>{coursePart.name} {coursePart.exerciseCount}</p>
         <p style={descriptionStyle}>{coursePart.description}</p>
        </div>
        )
    case "background":
      return (
        <div style={courseStyle}>
          <p style={headingStyle}>{coursePart.name} {coursePart.exerciseCount}</p>
          <p style={descriptionStyle}>{coursePart.description}</p>
          <p>Submit to: {coursePart.backgroundMaterial}</p>
        </div>
      )
    case "group":
      return (
        <div style={courseStyle}>
          <p style={headingStyle}>{coursePart.name} {coursePart.exerciseCount}</p>
          <p>Project Exercises: {coursePart.groupProjectCount}</p>
        </div>
      )
    case "special":
      return (
        <div style={courseStyle}>
          <p style={headingStyle}>{coursePart.name} {coursePart.exerciseCount}</p>
          <p style={descriptionStyle}>{coursePart.description}</p>
          <p>Required Skills: {coursePart.requirements.join(", ")}</p>
        </div>
      )
    default:
      return assertNever(coursePart)
  }
}

export default Part