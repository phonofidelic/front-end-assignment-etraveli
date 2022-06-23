import React from 'react'

import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  onSearch(value: string): void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <TextField
      style={{
        backgroundColor: '#fff'
      }}
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      }}
      placeholder="Type to search..."
      onChange={(event) => onSearch(event.target.value)}
    />
  )
}