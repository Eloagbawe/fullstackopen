import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
const total = props.good + props.neutral + props.bad
const average = (props.good - props.bad)/total
const positiveFeedbackPercentage = `${(props.good / total) * 100} %`

return(
  <div>
    <table>
    <thead></thead>
    <tbody>
    <Statistic text = {"good"} value = {props.good}/>
    <Statistic text = {"neutral"} value = {props.neutral}/>
    <Statistic text = {"bad"} value = {props.bad}/>
    <Statistic text = {"all"} value = {total}/>
    <Statistic text = {"average"} value = {average}/>
    <Statistic text = {"positive"} value = {positiveFeedbackPercentage}/>
    </tbody>
    <tfoot></tfoot>
    </table>
    </div>
)
}
const DisplayStatistics = (props) => {
if (props.good === 0 && props.bad === 0 && props.neutral === 0){
  return (
    <p>No feedbacks Given</p>
  )
}
return(
  <Statistics good = {props.good} neutral = {props.neutral} bad = {props.bad} />
)
}
const Button = (props) => {
return(
<button onClick = {props.onClick}>{props.text}</button>
)
}

const App = () => {

const [good,setGood] = useState(0)
const [neutral,setNeutral] = useState(0)
const [bad,setBad] = useState(0)
const goodClick = () =>{
 setGood(good + 1)
}
const neutralClick = () =>{
setNeutral(neutral + 1)
}
const badClick = () =>{
setBad(bad + 1)
}

return (
  <div>
    <h1>give feedback</h1>
    <Button onClick = {goodClick} text = {"good"}/>
    <Button onClick = {neutralClick} text = {"neutral"}/>
    <Button onClick = {badClick} text = {"bad"}/>
    <h1>Statistics</h1>
    <DisplayStatistics good = {good} bad = {bad} neutral = {neutral}/>
  </div>
)
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

