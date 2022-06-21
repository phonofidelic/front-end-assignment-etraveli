import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const STARWARS_MOVIES_ENDPOINT = 'https://swapi.dev/api/films/?format=json'

interface Episode {
  episode_id: number;
  release_date: string;
  title: string;
  opening_crawl: string
}

interface StarWarsFilmsResponse {
  count: number,
  results: Episode[]
}

function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      let response;
      try {
        response = await axios.get<StarWarsFilmsResponse>(STARWARS_MOVIES_ENDPOINT)
        console.log('Movies response:', response.data)
        setEpisodes(response.data.results)
        setLoading(false)
      } catch (err) {
        console.error('Could not fetch movies:', err)
        setError(new Error('Sorry, could not load movies'))
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <ul>
        {episodes.map((episode) => (<li key={episode.episode_id}>{episode.title}</li>))}
      </ul>
    </div>
  );
}

export default App;
