// Write a function called strictEquals(a, b) that returns the same value as a === b.
// Your implementation must not use the === or !== operators.

export function strictEquals(a, b) {
  // NaN si the only value in javascript that
  // is NOT strictly equal to itself
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return false;
  }

  // -0 === -0
  //  0 === 0
  // -0 === 0
  //  0 === -0
  // should equal true
  const isNotSymbol = (value) => typeof value !== 'symbol';
  const continueIfNotASymbolOperation = isNotSymbol(a) && isNotSymbol(b);

  if (continueIfNotASymbolOperation && (a < 1 || b < 1)) {
    if (Object.is(parseInt(a), 0) && Object.is(parseInt(b), 0)) {
      return true;
    }
  }

  return Object.is(a, b);
}
