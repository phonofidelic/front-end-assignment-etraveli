import { Episode } from "common/episode.interface"

export const mockResponse = (results: Episode[]) => ({
  count: results.length,
  next: null,
  previous: null,
  results
})

