import axios from 'axios';
import type { Diary } from './types';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    })
  }, [])

  const errorParser =  (error: any): string => {
    const data = error.response.data;

    if (data.error && Array.isArray(data.error)){
      return data.error.map((e: any) => e.message).join(',');
    }
    else{
      return 'Something went wrong'
    }
  }

  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entryToAdd = {
      date: newDate,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    axios.post<Diary>('http://localhost:3000/api/diaries', entryToAdd).then(response => {
      setDiaries(diaries.concat(response.data))
    })
    .catch(error => {
      const newMessage = errorParser(error)
      
      setMessage(newMessage);
      setTimeout(() => {
      setMessage('');
    }, 10000);
    });
    setNewDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  };

  const Notify = ({message}: { message: string }) => {
    if (!message) return null;
    return (
      <p style={{ color: 'red' }}>{message}</p>
    )
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      <Notify message={message}/>
      <ul>
        {diaries.map(diary => 
          <li key={diary.id}> <b>{diary.date}</b> weather: {diary.weather}, visibility: {diary.visibility} </li>
        )}
      </ul>
      <form onSubmit={createEntry}>
        <div>
          date:
          <input
           value={newDate}
           onChange={({ target }) => setNewDate(target.value)}/>
        </div>
        <div>
          weather: 
          <input
           value={weather}
           onChange={({ target }) => setWeather(target.value)}/>
        </div> 
        <div>
          visibility: 
          <input
           value={visibility}
           onChange={({ target }) => setVisibility(target.value)}/>
        </div>
        <div>
          comment: 
          <input
           value={comment}
           onChange={({ target }) => setComment(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
