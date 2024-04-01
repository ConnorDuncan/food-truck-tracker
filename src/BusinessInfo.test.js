import { render, screen } from '@testing-library/react';
import Businessinfo from './BusinessInfo';

test('renders learn react link', () => {
  render(<Businessinfo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
