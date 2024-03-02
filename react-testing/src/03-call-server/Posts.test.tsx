import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import Posts from './Posts';

const fakePosts = [
  {
    id: 1,
    title: 'title one',
    body: 'body one',
    userId: 1,
  },
  {
    id: 2,
    title: 'title two',
    body: 'body two',
    userId: 2,
  },
];

const server = setupServer(
  http.get('*/posts', () => {
    return HttpResponse.json(fakePosts);
  }),
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Posts />', () => {
  test('renders loading indicator when component mounts', () => {
    render(<Posts />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders posts list after successful data fetching', async () => {
    render(<Posts />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getAllByRole('listitem')).toHaveLength(fakePosts.length);

    fakePosts.forEach(post => {
      expect(
        screen.getByRole('heading', { level: 2, name: post.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });

  test('renders something wrong when fetch posts fails', async () => {
    server.use(
      http.get('*/posts', () => {
        return HttpResponse.json({}, { status: 400 });
      }),
    );
    render(<Posts />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');

    // expect(await screen.findByRole('alert')).toHaveTextContent(
    //   'Something went wrong',
    // );
    // screen.debug();
  });

  test('renders empty message for empty posts response', async () => {
    server.use(
      http.get('*/posts', () => {
        return HttpResponse.json([]);
      }),
    );
    render(<Posts />);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText('No posts for today')).toBeInTheDocument();
  });
});
