import React from 'react'

interface ContentProps {
    courseParts: {
        name: string;
        exerciseCount: number;
    }[]
}
const Content = ({courseParts}: ContentProps) => {
  return (
    <div>
        {courseParts.map((coursePart, index) => (
        <p key={index}>{coursePart.name} {coursePart.exerciseCount}</p>
      ))}
    </div>
  )
}

export default Content