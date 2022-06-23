import React, { useState } from 'react'
import { SortBy } from 'common/sortBy.enum'

import { Button, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

const SORT_LABELS = [
  {
    display: 'Episode',
    value: 'episode_id'
  },
  {
    display: 'Year',
    value: 'release_date'
  }
]

type SortMenuProps = {
  sortBy: SortBy
  onSortChange(value: SortBy): void
}

export default function SortMenu({ sortBy, onSortChange }: SortMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelection = (value: string) => {
    setAnchorEl(null)
    onSortChange(value as SortBy)
  }

  return (
    <div style={{ marginRight: 8 }}>
      <Button
        style={{
          height: 40,
          backgroundColor: '#fff'
        }}
        variant="outlined"
        onClick={handleOpen}
      >
        <Typography noWrap>Sort by...</Typography>
      </Button>
      <Menu
        style={{
          marginTop: 4,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ListItem
          style={{ minWidth: 300 }}
          secondaryAction={
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        >
          <ListItemText>Sort by</ListItemText>
        </ListItem>
        <Divider />
        {SORT_LABELS.map((label, i) => (
          <MenuItem
            key={i}
            dense
            selected={label.value === sortBy}
            onClick={() => handleSelection(label.value)}>{label.display}</MenuItem>
        ))}
      </Menu>
    </div>
  )
}