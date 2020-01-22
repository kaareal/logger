import path = require('path');

process.env.ENV_CONF_PATH = path.join(__dirname, 'env.conf');

import { getAll, get, has } from '../index';

describe('getAll', () => {
  it('confirm that all keys are return', () => {
    const all = getAll();
    expect(Object.keys(all)).toHaveLength(17);
    expect(all.EMPTY).toBe(null);
  });
});

describe('get', () => {
  it('get value', () => {
    expect(get('BASIC')).toBe('basic');
    expect(get('NUMBER')).toBe('1');
  });

  it('get empty', () => {
    expect(get('EMPTY')).toEqual(null);
  });

  it('not defined key', () => {
    expect(() => get('BAD_VALUE')).toThrow(
      'Configuration variable "BAD_VALUE" is not exposed as enviroment variable nor was a default provided in `env.conf`'
    );
  });

  it('get value as number', () => {
    expect(get('NUMBER', 'integer')).toBe(1);
  });

  it('get value as float', () => {
    expect(get('NUMBER', 'float')).toBe(1);
  });

  it('get value as boolean', () => {
    expect(get('NUMBER', 'boolean')).toBe(true);
  });

  it('get value as date', () => {
    expect(get('DATE', 'date').valueOf()).toBe(1548794502645);
  });

  it('get value as json', () => {
    expect(get('RETAIN_INNER_QUOTES', 'json')).toEqual({
      foo: 'bar'
    });
  });
});

describe('has', () => {
  it('with value', () => {
    expect(has('BASIC')).toBe(true);
  });

  it('without value', () => {
    expect(has('EMPTY')).toBe(false);
  });

  it('not defined key', () => {
    expect(has('BAD_VALUE')).toBe(false);
  });
});
