import { render, screen } from '@testing-library/react';
import BusinessPage from './BusinessPage';

test('renders learn react link', () => {
  render(<BusinessPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
