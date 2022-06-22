import React from 'react'
import { Episode } from 'common/episode.interface'
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

type EpisodesListProps = {
  episodes: Episode[]
  onEpisodeSelect(episode: Episode): void
}

export default function EpisodesList({ episodes, onEpisodeSelect }: EpisodesListProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="episodes table">
        <TableBody>
          {episodes.map((episode) => (
            <TableRow key={episode.episode_id} onClick={() => onEpisodeSelect(episode)}>
              <TableCell>
                <Typography variant="overline">Episode {episode.episode_id}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{episode.title}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="overline">{episode.release_date}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}