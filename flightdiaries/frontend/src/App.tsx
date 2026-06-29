import axios, { AxiosError }from 'axios';
import type { Diary } from './types';
import React, { useEffect, useState } from 'react';

const Notify = ({message}: { message: string }) => {
  if (!message) return null;
  return (
    <p style={{ color: 'red' }}>{message}</p>
  )
};

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

  const errorParser =  (error: AxiosError): string => {
    const data = error.response.data;

    if (data.error && Array.isArray(data.error)){
      return data.error.map((e) => e.message).join(',');
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
           type='date'
           value={newDate}
           onChange={({ target }) => setNewDate(target.value)}/>
        </div>
        <div>
          weather: 
          <input
           type='radio'
           name={weather}
           value='sunny'
           id='1sunny'
           onChange={({ target }) => setWeather(target.value)}/>
           <label for='1sunny'>sunny </label>
           <input
           type='radio'
           name={weather}
           value='rainy'
           id='2rainy'
           onChange={({ target }) => setWeather(target.value)}/>
           <label for='2rainy'>rainy </label>
           <input
           type='radio'
           name={weather}
           value='cloudy'
           id='3cloudy'
           onChange={({ target }) => setWeather(target.value)}/>
           <label for='3cloudy'>cloudy </label>
           <input
           type='radio'
           name={weather}
           value='stormy'
           id='4stormy'
           onChange={({ target }) => setWeather(target.value)}/>
           <label for='4stormy'>stormy</label>
           <input
           type='radio'
           name={weather}
           value='windy'
           id='4windy'
           onChange={({ target }) => setWeather(target.value)}/>
           <label for='4windy'>windy</label>
        </div> 
        <div>
          visibility: 
          
          <input
           type='radio'
           name={visibility}
           value='great'
           id='1great'
           onChange={({ target }) => setVisibility(target.value)}/>
           <label for='1great'>great </label>
           <input
           type='radio'
           name={visibility}
           value='good'
           id='2good'
           onChange={({ target }) => setVisibility(target.value)}/>
           <label for='2good'>good </label>
           <input
           type='radio'
           name={visibility}
           value='ok'
           id='3ok'
           onChange={({ target }) => setVisibility(target.value)}/>
           <label for='3ok'>ok </label>
           <input
           type='radio'
           name={visibility}
           value='poor'
           id='4poor'
           onChange={({ target }) => setVisibility(target.value)}/>
           <label for='4poor'>poor</label>
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
