import { render } from '@testing-library/react';
import App from './App';

test('renders whole application', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
