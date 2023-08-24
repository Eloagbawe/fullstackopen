import React from 'react'

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: CoursePart[]
}

const Total = ({courseParts}: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total