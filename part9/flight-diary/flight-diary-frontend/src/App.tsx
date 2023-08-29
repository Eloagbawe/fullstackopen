import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';

import './App.css';

function App() {
  const [ diaries, setDiaries ] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then((data) => {
      setDiaries(data.data as DiaryEntry[])
    })
  }, [])
  
  return (
    <div className="App">
     <h2>Diary Entries</h2>
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
