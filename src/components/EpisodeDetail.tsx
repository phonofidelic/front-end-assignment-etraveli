import React from 'react'
import { Episode } from 'common/episode.interface'
import { Typography } from '@mui/material'

type EpisodeDetailProps = {
  episode: Episode | null
}

export default function EpisodeDetail({ episode }: EpisodeDetailProps) {

  if (!episode) return (
    <div>
      No movie selected
    </div>
  )

  return (
    <div style={{ margin: 16 }}>
      <h1>{episode.title}</h1>
      <div><Typography>{episode.opening_crawl}</Typography></div>
      <div style={{ marginTop: 8 }}><Typography>Director: {episode.director}</Typography></div>
    </div>
  )
}