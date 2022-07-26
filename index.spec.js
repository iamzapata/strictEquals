import { strictEquals } from './index.js';
import { describe, it, expect } from 'vitest';

// Write a function called strictEquals(a, b) that returns the same value as a === b.
// Your implementation must not use the === or !== operators.

describe('strictEquals', () => {
  it('is declared', () => {
    expect(() => strictEquals()).not.toThrow();
  });

  describe('-0, 0 Edge Case', () => {
    it("returns 'true' for 0,-0 and -0, 0", () => {
      expect(strictEquals(0, -0)).toBe(true);
      expect(strictEquals(-0, 0)).toBe(true);
      expect(strictEquals(-0, -0)).toBe(true);
      expect(strictEquals(0, 0)).toBe(true);
      expect(strictEquals(0n, 0n)).toBe(true);
      expect(strictEquals(-0n, 0n)).toBe(true);
      expect(strictEquals(-0n, -0n)).toBe(true);

      expect(strictEquals(-0, 10)).toBe(false);
    });
  });

  describe('NaN Edge Case', () => {
    it("returns 'false' for NaN, NaN", () => {
      expect(strictEquals(NaN, NaN)).toBe(false);
      expect(strictEquals(0, NaN)).toBe(false);
      expect(strictEquals(false, NaN)).toBe(false);
      expect(strictEquals(1 / 0, NaN)).toBe(false);
      expect(strictEquals(Infinity / 0, NaN)).toBe(false);
      expect(strictEquals(Infinity / Infinity, NaN)).toBe(false);
    });
  });

  describe('strings', () => {
    [
      ['', '', true],
      ['a', '', false],
      ['', 'asas', false],
      ['A', 'a', false],
      ['andres', 'andres', true],
    ].forEach(function stringTextCase([a, b, result], index) {
      it(`${index}) returns ${result} for ${a} and ${b}`, () => {
        expect(strictEquals(a, b)).toBe(result);
      });
    });
  });

  describe('numbers and bigints', () => {
    [
      [0, 0, true],
      [100, 100, true],
      [Infinity, Infinity, true],
      [10 + 0, 11 - '1', true],
      [-0, -0, true],
      [1n, 1n, true],
      [10n, 11n, false],
      [-10n, -10n, true],
    ].forEach(function stringTextCase([a, b, result], index) {
      it(`${index}) returns ${result} for ${a} and ${b}`, () => {
        expect(strictEquals(a, b)).toBe(result);
      });
    });
  });

  describe('booleans', () => {
    [
      [true, true, true],
      [false, false, true],
      [true, false, false],
      [false, true, false],
    ].forEach(function stringTextCase([a, b, result], index) {
      it(`${index}) returns ${result} for ${a} and ${b}`, () => {
        expect(strictEquals(a, b)).toBe(result);
      });
    });
  });

  describe('undefined and null', () => {
    it('returns true for undefined === undefined', () => {
      expect(strictEquals(undefined, undefined)).toBe(true);
    });

    it('returns true for null === null', () => {
      expect(strictEquals(undefined, undefined)).toBe(true);
    });
    it('returns false for undefined === null', () => {
      expect(strictEquals(undefined, null)).toBe(false);
    });

    it('returns false for null === undefined', () => {
      expect(strictEquals(null, undefined)).toBe(false);
    });
  });

  describe('Symbol', () => {
    [
      [Symbol(), Symbol(), false],
      [Symbol('foo'), Symbol('foo'), false],
    ].forEach(function stringTextCase([a, b, result], index) {
      it(`${index}) returns ${result} for ${a.toString()} and ${b.toString()}`, () => {
        expect(strictEquals(a, b)).toBe(result);
      });
    });
  });

  describe('Objects', () => {
    [
      [{}, {}, false],
      [[], [], false],
      [new Date(), new Date(), false],
      [() => null, () => null, false],
      [function foo() {}, function foo() {}, false],
    ].forEach(function stringTextCase([a, b, result], index) {
      it(`${index}) returns ${result} for ${a} and ${b}`, () => {
        expect(strictEquals(a, b)).toBe(result);
      });
    });
  });
});
