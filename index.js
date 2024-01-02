/**
 * @typedef {{shouldSet: boolean, deleteAfter: boolean}} GetHashFromKeyOptions
 */

const keyCounterSymbol = createSymbol();
const refsHashMapSymbol = createSymbol();
const getHashFromKeySymbol = createSymbol();
const getHashFromKeysSymbol = createSymbol();

class ArrayMap extends Map {
  constructor() {
    super();
    this[keyCounterSymbol] = 0;
    this[refsHashMapSymbol] = new WeakMap();
  }

  /**
   * @param {Array} keys
   */
  has(keys) {
    return super.has(this[getHashFromKeysSymbol](keys));
  }

  /**
   * @param {Array} keys
   */
  get(keys) {
    const hashedKeys = this[getHashFromKeysSymbol](keys);
    return super.get(hashedKeys);
  }

  /**
   * @param {Array} keys
   */
  set(keys, value) {
    let hash = this[getHashFromKeysSymbol](keys, { shouldSet: true });

    return super.set(hash, value);
  }

  /**
   * @param {Array} keys
   */
  delete(keys) {
    const hashedKeys = this[getHashFromKeysSymbol](keys, { deleteAfter: true });
    return super.delete(hashedKeys);
  }

  clear() {
    this[refsHashMapSymbol].clear();
    super.clear();
  }

  /**
   * @param {Array} keys
   * @param {GetHashFromKeyOptions} options
   */
  [getHashFromKeysSymbol](keys, options) {
    return keys.reduce((concatenated, currentKey) => concatenated + this[getHashFromKeySymbol](currentKey, options), "");
  }

  /**
   * @param {any} key
   * @param {GetHashFromKeyOptions} options
   */
  [getHashFromKeySymbol](key, { shouldSet = false, deleteAfter = false } = {}) {
    if (isPrimitive(key)) {
      return key;
    }

    const refsHashMap = this[refsHashMapSymbol];

    if (refsHashMap.has(key)) {
      const hash = refsHashMap.get(key);
      if (deleteAfter) {
        refsHashMap.delete(key);
      }
      return hash;
    }

    const hash = `__ref$${this[keyCounterSymbol]++}`;

    if (shouldSet) {
      refsHashMap.set(key, hash);
    }

    return hash;
  }
}

function isPrimitive(value) {
  return value === null || (typeof value !== "object" && typeof value !== "function");
}

/**
 * for better code minification
 */
function createSymbol() {
  return Symbol();
}

export default ArrayMap;
