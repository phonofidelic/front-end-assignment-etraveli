import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { matchSorter } from 'match-sorter'
import { Episode } from 'common/episode.interface';
import { SortBy } from 'common/sortBy.enum';
import { STARWARS_MOVIES_ENDPOINT } from 'common/constants';
import EpisodesList from 'components/EpisodesList';
import EpisodeDetail from 'components/EpisodeDetail';

import { Grid } from '@mui/material';
import SearchBar from 'components/SearchBar';
import Toolbar from 'components/Toolbar';
import SortMenu from 'components/SortMenu';

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
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.EPISODE)

  const handleSelectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode)
  }

  const handleFilter = (value: string) => {
    /**
     * Can filter by additional properties by adding them to the "keys" option:
     * https://github.com/kentcdodds/match-sorter#keys-string
     */
    const filtered = matchSorter(episodes, value, { keys: ['title'] })
    setFilteredEpisodes(filtered.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1)))
  }

  const handleSortChange = (value: SortBy) => {
    setSortBy(value)
    const sorted = filteredEpisodes.sort((a, b) => (a[value] < b[value] ? -1 : 1))
    setFilteredEpisodes(sorted)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      let response;
      try {
        response = await axios.get<StarWarsFilmsResponse>(`${STARWARS_MOVIES_ENDPOINT}/?format=json`)
        // console.log('Movies response:', response.data)
        setEpisodes(response.data.results)
        setLoading(false)
      } catch (err) {
        // console.error('Could not fetch movies:', err)
        setError(new Error('Sorry, could not load movies'))
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    setFilteredEpisodes(
      filteredEpisodes.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))
    )
  }, [filteredEpisodes, sortBy])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <Grid container style={{}}>
      <Grid item xs={12}>
        <Toolbar>
          <SortMenu sortBy={sortBy} onSortChange={handleSortChange} /><SearchBar onSearch={handleFilter} />
        </Toolbar>
      </Grid>
      <Grid item md={6}>
        <EpisodesList episodes={filteredEpisodes} selectedEpisode={selectedEpisode} onEpisodeSelect={handleSelectEpisode} />
      </Grid>
      <Grid item md={6}
        style={{
          borderLeft: `1px solid #ccc`,
          borderBottom: `1px solid #ccc`
        }}
      >
        <EpisodeDetail episode={selectedEpisode} />
      </Grid>
    </Grid>
  );
}

export default App;
