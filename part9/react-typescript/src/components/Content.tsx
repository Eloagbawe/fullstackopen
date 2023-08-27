import Part from './Part';
import { CoursePart } from '../App';

interface ContentProps {
    courseParts: CoursePart[]
}
const Content = ({courseParts}: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <Part key={index} coursePart={coursePart}/>
      ))}
    </div>
  )
}

export default Content