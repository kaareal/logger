const { parse } = require('../parse');
const fs = require('fs');
const path = require('path');

const [parsed, emptyKeys] = parse(fs.readFileSync(path.join(__dirname, 'env.conf'), { encoding: 'utf8' }));

describe('parse', () => {
  it('sets basic environment variable', () => {
    expect(parsed.get('BASIC')).toBe('basic');
  });

  it('reads after a skipped line', () => {
    expect(parsed.get('AFTER_LINE')).toBe('after_line');
  });

  it('defaults empty values to undefined', () => {
    expect(parsed.get('EMPTY')).toBe(null);
  });

  it('escapes double quoted values', () => {
    expect(parsed.get('DOUBLE_QUOTES')).toBe('double_quotes');
  });

  it('escapes single quoted values', () => {
    expect(parsed.get('SINGLE_QUOTES')).toBe('single_quotes');
  });

  it('expands newlines but only if double quoted', () => {
    expect(parsed.get('EXPAND_NEWLINES')).toBe('expand\nnewlines');
    expect(parsed.get('DONT_EXPAND_NEWLINES_1')).toBe('dontexpand\\nnewlines');
    expect(parsed.get('DONT_EXPAND_NEWLINES_2')).toBe('dontexpand\\nnewlines');
  });

  it('ignores commented lines', () => {
    expect(parsed.get('COMMENTS')).toBe(undefined);
  });

  it('respects equals signs in values', () => {
    expect(parsed.get('EQUAL_SIGNS')).toBe('equals==');
  });

  it('retains inner quotes', () => {
    expect(parsed.get('RETAIN_INNER_QUOTES')).toBe('{"foo": "bar"}');
    expect(parsed.get('RETAIN_INNER_QUOTES_AS_STRING')).toBe('{"foo": "bar"}');
  });

  it('retains spaces in string', () => {
    expect(parsed.get('INCLUDE_SPACE')).toBe('some spaced out string');
  });

  it('parses email addresses completely', () => {
    expect(parsed.get('USERNAME')).toBe('something@burger.monster');
  });

  it('should mark EMPTY as an empty key', () => {
    expect(emptyKeys).toEqual(['EMPTY']);
  });
});

export = {};
