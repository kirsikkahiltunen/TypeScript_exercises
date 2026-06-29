interface Diary {
  id: string,
  date: string,
  weather: string,
  visibility: string
}

import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    })
  }, [])

  return (
    <div>
      <h1>Flight diaries</h1>
      <ul>
        {diaries.map(diary => 
          <li key={diary.id}> <b>{diary.date}</b> weather: {diary.weather}, visibility: {diary.visibility} </li>
        )}
      </ul>
    </div>
  )
}

export default App
