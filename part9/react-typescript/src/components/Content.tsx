import React from 'react'

interface ContentProps {
    name: string;
    exerciseCount: number;
}
const Content = ({name, exerciseCount}: ContentProps) => {
  return (
    <div>
        <p>
        {name} {exerciseCount}
      </p>
    </div>
  )
}

export default Content