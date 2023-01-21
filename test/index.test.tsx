import { render, screen } from '@testing-library/react'
import Home from 'src/pages';

describe('Home', () => {
  test('title text test', () => {
    render(<Home cereals={[]} uniqMfrArr={[]} uniqTypeArr={[]} />)
    expect(screen.getByText('chart-js-app')).toBeInTheDocument()
  });
});