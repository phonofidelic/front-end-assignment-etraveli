import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { STARWARS_MOVIES_ENDPOINT } from 'common/constants';
import { mockResponse } from 'mock';
import App from './App';



const server = setupServer(
  rest.get(STARWARS_MOVIES_ENDPOINT, (rec, res, ctx) => {
    return res(ctx.json(mockResponse([
      {
        episode_id: 1,
        release_date: '3333-33-33',
        title: 'A test',
        opening_crawl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id auctor ex. Duis vel metus a nisl dapibus varius. Sed ornare nisi sit amet velit ornare ultrices. Donec sodales sodales nisi, ut egestas nibh posuere vel. Sed tempor nisl quis feugiat iaculis. Nulla posuere ligula quis nisl dignissim, non vehicula elit volutpat. Aliquam accumsan a ante a consequat. Donec venenatis sodales mauris.',
        director: 'George Lucas'
      },
      {
        episode_id: 2,
        release_date: '2222-22-22',
        title: 'B test',
        opening_crawl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id auctor ex. Duis vel metus a nisl dapibus varius. Sed ornare nisi sit amet velit ornare ultrices. Donec sodales sodales nisi, ut egestas nibh posuere vel. Sed tempor nisl quis feugiat iaculis. Nulla posuere ligula quis nisl dignissim, non vehicula elit volutpat. Aliquam accumsan a ante a consequat. Donec venenatis sodales mauris.',
        director: 'George Lucas'
      },
      {
        episode_id: 3,
        release_date: '1111-11-11',
        title: 'C test',
        opening_crawl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id auctor ex. Duis vel metus a nisl dapibus varius. Sed ornare nisi sit amet velit ornare ultrices. Donec sodales sodales nisi, ut egestas nibh posuere vel. Sed tempor nisl quis feugiat iaculis. Nulla posuere ligula quis nisl dignissim, non vehicula elit volutpat. Aliquam accumsan a ante a consequat. Donec venenatis sodales mauris.',
        director: 'George Lucas'
      },
    ])))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a loading indicator while fetching data', () => {
  render(<App />);
  const loadingIndicator = screen.getByText(/loading.../i);
  expect(loadingIndicator).toBeInTheDocument();
});

test('renders a sort button once data is available', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/sort by.../i)).toBeInTheDocument()
  }, { timeout: 3000 });
})

test('renders a searchbar once data is available', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByPlaceholderText(/type to search.../i)).toBeInTheDocument()
  }, { timeout: 3000 });
})

test('displays an empty state message when no episode is selected', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/no movie selected/i)).toBeInTheDocument()
  }, { timeout: 3000 });
})

test('renders fetched data in a list', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/a test/i)).toBeInTheDocument()
    expect(screen.getByText(/b test/i)).toBeInTheDocument()
    expect(screen.getByText(/c test/i)).toBeInTheDocument()
  }, { timeout: 3000 });
})

test.todo('displays a message if an error occurs')