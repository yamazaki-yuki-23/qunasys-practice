import { render, screen } from '@testing-library/react'
import Home from 'src/pages';

describe('Axis', () => {
  test('axis type default test', () => {
    render(<Home cereals={[]} uniqMfrArr={[]} uniqTypeArr={[]} />)
    expect(screen.getByText('calories')).toBeInTheDocument()
  });
});