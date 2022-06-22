import React from 'react'

import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  onSearch(value: string): void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        // label: 'Type to search...'
      }}
      label="Type to search..."
      onChange={(event) => onSearch(event.target.value)}
    />
  )
}