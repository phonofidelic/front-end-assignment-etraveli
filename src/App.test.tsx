import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { STARWARS_MOVIES_ENDPOINT } from 'common/constants';
import { mockResponse } from 'mock';
import App from './App';

const server = setupServer(
  rest.get(STARWARS_MOVIES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(mockResponse([
      {
        episode_id: 1,
        release_date: '3333-33-33',
        title: 'A test',
        opening_crawl: 'Crawl text for Episode 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id auctor ex. Duis vel metus a nisl dapibus varius. Sed ornare nisi sit amet velit ornare ultrices. Donec sodales sodales nisi, ut egestas nibh posuere vel. Sed tempor nisl quis feugiat iaculis. Nulla posuere ligula quis nisl dignissim, non vehicula elit volutpat. Aliquam accumsan a ante a consequat. Donec venenatis sodales mauris.',
        director: 'George Lucas'
      },
      {
        episode_id: 2,
        release_date: '2222-22-22',
        title: 'B test',
        opening_crawl: 'Crawl text for Episode 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id auctor ex. Duis vel metus a nisl dapibus varius. Sed ornare nisi sit amet velit ornare ultrices. Donec sodales sodales nisi, ut egestas nibh posuere vel. Sed tempor nisl quis feugiat iaculis. Nulla posuere ligula quis nisl dignissim, non vehicula elit volutpat. Aliquam accumsan a ante a consequat. Donec venenatis sodales mauris.',
        director: 'George Lucas'
      },
      {
        episode_id: 3,
        release_date: '1111-11-11',
        title: 'C test',
        opening_crawl: 'Crawl text for Episode 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id auctor ex. Duis vel metus a nisl dapibus varius. Sed ornare nisi sit amet velit ornare ultrices. Donec sodales sodales nisi, ut egestas nibh posuere vel. Sed tempor nisl quis feugiat iaculis. Nulla posuere ligula quis nisl dignissim, non vehicula elit volutpat. Aliquam accumsan a ante a consequat. Donec venenatis sodales mauris.',
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

test('displays a message if an error occurs', async () => {
  server.use(
    rest.get(STARWARS_MOVIES_ENDPOINT, (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<App />)

  await waitFor(() => expect(screen.getByText(/sorry, could not load movies/i)).toBeInTheDocument())
})

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

test('displays details of a selected episode', async () => {
  render(<App />);
  const getEpisode1 = () => screen.getByText(/a test/i)

  await waitFor(() => { getEpisode1() })
  fireEvent.click(getEpisode1())

  await waitFor(() => {
    expect(screen.getByText(/crawl text for episode 1/i)).toBeInTheDocument()
  })
})

test('renders fetched data in a list', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/a test/i)).toBeInTheDocument()
    expect(screen.getByText(/b test/i)).toBeInTheDocument()
    expect(screen.getByText(/c test/i)).toBeInTheDocument()
  }, { timeout: 3000 });
})

/**
 * Checks the order of items in the Episodes list.
 * https://stackoverflow.com/a/66139828
 */
test('sorts by episode ID by default', async () => {
  render(<App />);

  await waitFor(() => screen.getByText(/a test/i))

  const episodesContainer = screen.getByTestId('episodes-coontainer')
  const children = episodesContainer.children

  expect(children.item(0)?.textContent).toEqual('Episode 1A test3333-33-33')
  expect(children.item(1)?.textContent).toEqual('Episode 2B test2222-22-22')
  expect(children.item(2)?.textContent).toEqual('Episode 3C test1111-11-11')
})

test('can sort by release date', async () => {
  render(<App />);
  const sortButton = await waitFor(() => screen.getByTestId('sort-button'))

  fireEvent.click(sortButton)
  await waitFor(async () => screen.findByText(/year/i))

  /**
   * Check that the sort menu is rendered
   */
  await waitFor(() => {
    expect(screen.getByText(/Sort by$/)).toBeInTheDocument()
    expect(screen.getByText(/Episode$/)).toBeInTheDocument()
    expect(screen.getByText(/year/i)).toBeInTheDocument()
  })

  /**
   * Chose the Year option
   */
  fireEvent.click(screen.getByText(/year/i))

  const episodesContainer = screen.getByTestId('episodes-coontainer')
  const children = episodesContainer.children

  /**
   * Check that the list is sorted by Year
   */
  expect(children.item(2)?.textContent).toEqual('Episode 1A test3333-33-33')
  expect(children.item(1)?.textContent).toEqual('Episode 2B test2222-22-22')
  expect(children.item(0)?.textContent).toEqual('Episode 3C test1111-11-11')
})


test.todo('can filter by title')
test.todo('notifies the user if no results are found')