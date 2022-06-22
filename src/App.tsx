import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import EpisodesList from 'components/EpisodesList';
import { Grid } from '@mui/material';

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
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)

  const handleSelectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode)
  }

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
  console.log('loading:', loading)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <Grid container>
      <Grid item md={6}>
        <EpisodesList episodes={episodes} onEpisodeSelect={handleSelectEpisode} />
      </Grid>
      <Grid item md={6}>
        <div>{selectedEpisode ? selectedEpisode.title : 'No movie selected'}</div>
      </Grid>
    </Grid>
  );
}

export default App;
