import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App /> test', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});
