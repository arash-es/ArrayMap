# ArrayMap - Enhanced Map With Sequences as Key

ArrayMap extends the native JavaScript `Map` constructor, providing enhanced functionality for handling sequences of keys. Unlike a traditional `Map` that supports a single key for each value, ArrayMap allows you to use an array of keys as a composite key, enabling you to attach values to specific combinations of keys.

## Installation

To use ArrayMap in your project, you can install it via npm:

```bash
npm install @arashes/arraymap
```

## Usage

### Creating an ArrayMap

You can create an instance of ArrayMap by passing an optional array of entries during initialization:

```javascript
import ArrayMap from 'arraymap';

const myArrayMap = new ArrayMap([
  [[key1, key2], value1],
  [[key3, key4], value2],
  // ...
]);
```

### Key Sequence Support

ArrayMap supports sequences of keys, allowing you to perform operations based on the entire key sequence:

```javascript
const keys = [key1, key2];
myArrayMap.has(keys);    // Check if the sequence exists
myArrayMap.get(keys);    // Retrieve the value associated with the sequence
myArrayMap.set(keys, value); // Set a value for the given key sequence
myArrayMap.delete(keys); // Delete the entry associated with the key sequence
```

### Key Sequence Order

The order of keys in the sequence matters, making it useful when keys cannot be easily combined, such as objects.

### Examples

```javascript
const coordinatesMap = new ArrayMap([
  [['x', 'y'], 'Point A'],
  [['y', 'x'], 'Point B'],
]);

console.log(coordinatesMap.get(['x', 'y'])); // Output: 'Point A'
console.log(coordinatesMap.get(['y', 'x'])); // Output: 'Point B'
```

usage in memoization example:
```javascript
function expensiveOperation(str, obj) {
  // Simulate a time-consuming operation
  console.log("Performing expensive operation");

  // Returns a new object
  return {
    str,
    obj
  };
}

// Memoization wrapper function
function memoizedExpensiveOperation(str, obj) {
  // Check if the result is already in the cache
  const cacheKey = [str, obj];
  if (memoizationCache.has(cacheKey)) {
    console.log('Retrieving result from cache.');
    return memoizationCache.get(cacheKey);
  }

  // Perform the expensive operation
  const result = expensiveOperation(str, obj);

  // Cache the result for future use
  memoizationCache.set(cacheKey, result);

  return result;
}

const options = { Hello: 'World' }
// Example usage
const result1 = memoizedExpensiveOperation('Say', options); // Will perform the expensive operation
const result2 = memoizedExpensiveOperation('Say', options); // Will retrieve result from the cache

console.log(Object.is(result1, result2)); // true
```

## Internals

### Hashing

Internally, ArrayMap utilizes a custom hashing mechanism to convert key sequences into unique hashes.

## Contributions

Contributions and feedback are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/arash-es/arraymap).

## License

ArrayMap is licensed under the [MIT License](LICENSE.md).