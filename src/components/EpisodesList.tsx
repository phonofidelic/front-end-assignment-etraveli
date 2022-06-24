import React from 'react'
import { Episode } from 'common/episode.interface'
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

type EpisodesListProps = {
  episodes: Episode[];
  selectedEpisode: Episode | null;
  onEpisodeSelect(episode: Episode): void;
}

export default function EpisodesList({ episodes, selectedEpisode, onEpisodeSelect }: EpisodesListProps) {

  if (!episodes.length) return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <div>No results found</div>
    </div>
  )

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="episodes table">
        <TableBody data-testid="episodes-container">
          {episodes.map((episode) => (
            <TableRow
              style={{ cursor: 'pointer' }}
              key={episode.episode_id}
              hover
              selected={episode.episode_id === selectedEpisode?.episode_id}
              onClick={() => onEpisodeSelect(episode)}>
              <TableCell style={{ paddingLeft: 32 }}>
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