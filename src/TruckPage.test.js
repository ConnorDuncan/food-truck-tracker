import { render, screen } from '@testing-library/react';
import TruckPage from './TruckPage';

test('renders learn react link', () => {
  render(<TruckPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

