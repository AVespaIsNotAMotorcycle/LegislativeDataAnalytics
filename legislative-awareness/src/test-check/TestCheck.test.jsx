import { describe, expect, test } from 'vitest';
import checkForTests from './TestCheck';

describe('checkForTests', () => {
  test('all .jsx files should have corresponding .test.jsx file', async() => {
    const t = await checkForTests('../');
    expect(t).toBe(false);
  });
});
