import React, {useEffect, useState} from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './diaryService';
import './App.css';

function App() {
  const [ diaries, setDiaries ] = useState<DiaryEntry[]>([]);
  const [ newDiary, setNewDiary ] = useState<NewDiaryEntry>({
    date: '',
    visibility: 'great',
    weather: 'sunny',
    comment: ''
  })

  const { date, visibility, weather, comment} = newDiary;

  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiary({
      ...newDiary,
      [e.target.name]: e.target.value
    })
  }

  const addDiary = (e: React.SyntheticEvent) => {
    e.preventDefault()
    createDiary(newDiary).then((data) => {
      setDiaries(diaries.concat(data))
      setNewDiary({
        date: '',
        visibility: '',
        weather: '',
        comment: ''
      })
    }).catch(err => {
      err?.data ? setErrorMessage(err?.data) : setErrorMessage('An error occurred')
      if (err?.data) {
        setErrorMessage(err?.data)
      }
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    })
  }

  return (
    <div className="App">
     <h2>Diary Entries</h2>
     {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
     <form style={{padding: "0.5rem 0"}} onSubmit={addDiary}>
      <div style={{margin: "2rem 0"}}>
        <label htmlFor='date' style={{marginRight: "1rem"}}>Date</label>
        <input id="date" type="date" name="date" value={date} onChange={handleChange}/>
      </div>

      <div style={{margin: "2rem 0"}}>
        <span style={{marginRight: "1rem"}}>Visibility</span>
        
        <label htmlFor='great' style={{marginRight: "0.2rem"}}>Great</label>
        <input style={{marginRight: "1.5rem"}} id="great" type="radio" name="visibility" value="great" onChange={handleChange} checked={visibility === 'great'}/>
        
        <label htmlFor='good' style={{marginRight: "0.2rem"}}>Good</label>
        <input style={{marginRight: "1.5rem"}} id="good" type="radio" name="visibility" value="good" onChange={handleChange} checked={visibility === 'good'}/>
        
        <label htmlFor='ok' style={{marginRight: "0.2rem"}}>Ok</label>
        <input style={{marginRight: "1.5rem"}} id="ok" type="radio" name="visibility" value="ok" onChange={handleChange} checked={visibility === 'ok'}/>

        <label htmlFor='poor' style={{marginRight: "0.2rem"}}>Poor</label>
        <input style={{marginRight: "1.5rem"}} id="poor" type="radio" name="visibility" value="poor" onChange={handleChange} checked={visibility === 'poor'}/>

      </div>

      <div style={{margin: "2rem 0"}}>
        <span style={{marginRight: "1rem"}}>Weather</span>

        <label htmlFor='sunny' style={{marginRight: "0.2rem"}}>Sunny</label>
        <input style={{marginRight: "1.5rem"}} id="sunny" type="radio" name="weather" value="sunny" onChange={handleChange} checked={weather === 'sunny'}/>
        
        <label htmlFor='rainy' style={{marginRight: "0.2rem"}}>Rainy</label>
        <input style={{marginRight: "1.5rem"}} id="rainy" type="radio" name="weather" value="rainy" onChange={handleChange} checked={weather === 'rainy'}/>
        
        <label htmlFor='cloudy' style={{marginRight: "0.2rem"}}>Cloudy</label>
        <input style={{marginRight: "1.5rem"}} id="cloudy" type="radio" name="weather" value="cloudy" onChange={handleChange} checked={weather === 'cloudy'}/>

        <label htmlFor='stormy' style={{marginRight: "0.2rem"}}>Stormy</label>
        <input style={{marginRight: "1.5rem"}} id="stormy" type="radio" name="weather" value="stormy" onChange={handleChange} checked={weather === 'stormy'}/>

        <label htmlFor='windy' style={{marginRight: "0.2rem"}}>Windy</label>
        <input style={{marginRight: "1.5rem"}} id="windy" type="radio" name="weather" value="windy" onChange={handleChange} checked={weather === 'windy'}/>
      </div>

      <div style={{margin: "2rem 0"}}>
        <label htmlFor='comment' style={{marginRight: "1rem"}}>Comment</label>
        <input id="comment" type="text" name="comment" value={comment} onChange={handleChange}/>
      </div>

      <div style={{margin: "2rem 0"}}>
        <button type="submit">add</button>
      </div>

     </form>

     {diaries.map((diary, index) => (
      <div key={index} style={{padding: "0.5rem 0"}}>
        <h3>{diary?.date}</h3>
        <p>visibility: {diary?.visibility}</p>
        <p>weather: {diary?.weather}</p>
      </div>
     ))}
    </div>
  );
}

export default App;
