import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { matchSorter } from 'match-sorter'
import { Episode } from 'common/episode.interface';
import EpisodesList from 'components/EpisodesList';
import EpisodeDetail from 'components/EpisodeDetail';

import { Grid } from '@mui/material';
import SearchBar from 'components/SearchBar';
import Toolbar from 'components/Toolbar';

const STARWARS_MOVIES_ENDPOINT = 'https://swapi.dev/api/films/?format=json'

interface StarWarsFilmsResponse {
  count: number,
  results: Episode[]
}

function App() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([])

  const handleSelectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode)
  }

  const handleFilter = (value: string) => {
    console.log('handleFilter, value:', value)
    const filtered = matchSorter(episodes, value, { keys: ['title'] })
    setFilteredEpisodes(filtered)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      let response;
      try {
        response = await axios.get<StarWarsFilmsResponse>(STARWARS_MOVIES_ENDPOINT)
        console.log('Movies response:', response.data)
        setEpisodes(response.data.results)
        setFilteredEpisodes(response.data.results)
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
      <Grid item xs={12}>
        <Toolbar>
          <SearchBar onSearch={handleFilter} />
        </Toolbar>
      </Grid>
      <Grid item md={6}>
        <EpisodesList episodes={filteredEpisodes} onEpisodeSelect={handleSelectEpisode} />
      </Grid>
      <Grid item md={6}>
        <EpisodeDetail episode={selectedEpisode} />
      </Grid>
    </Grid>
  );
}

export default App;
