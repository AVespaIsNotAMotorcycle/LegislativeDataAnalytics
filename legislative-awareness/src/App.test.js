import React from 'react';
import ReactDOM from 'react-dom/client';
import { act, render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders without crashing', async () => {
  act(() => {
    let container = document.createElement('div');
    const root = ReactDOM.createRoot(container).render(
      <App />
    );
  });
});
