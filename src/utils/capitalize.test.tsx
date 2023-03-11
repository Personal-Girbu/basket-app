import { capitalize } from './capitalize';

describe('capitalize util function', () => {
  it('should convert uppercase first letter of string', () => {
    expect(capitalize('somestring')).toBe('Somestring');
  });
});
