import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';



beforeEach(() => {
  jest.clearAllMocks();
});

it('renders the title', () => {
  render(<App />);
  const titleElement = screen.getByText("Click the button for a random quote!");
  expect(titleElement).toBeInTheDocument();
});

it('handles button click and fetches quotes', async () => {
  render(<App />);

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ content: 'Mocked Quote 1' }]),
  });

  fireEvent.click(screen.getByText("Generate Quote"));

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/quotes/random')
    
});
