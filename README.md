# Convolution

Perform convolution operations on one dimensional arrays. This library provides a flexible direct convolution implementation. The library supports both regular arrays and typed arrays.

Note that this library does not provide a fast (Fast Fourier transform based) convolution implementation. If you are looking for a fast convolution implementation, take a look at [ndarray-convolve](http://npmjs.com/package/ndarray-convolve).

## Installation

```shell
 $ npm i convolution
```

## Usage

### Convolve

`convolve(a: Array<T> | TypedArray, b: Array<T> | TypedArray): Array<T> | TypedArray`

Performs a convolution operation on two arrays one dimensional `a` and `b`. The function returns a new array of the same type as the input, which represents the result of the convolution.

```ts
import convolve from "convolution"

const a = [1, 2, 3]
const b = [1, 2, 3]

const result = convolve(a, b)
// result = [1, 4, 10, 12, 9]
```

### Convolve Arbitrary

`convolveArbitrary(convolutionStepFunction: (a: List, b: List) => T): (a: List, b: List) => List`

Creates a convolution function given a custom convolution step function. A convolution step is the operation of combining two arrays of the same length into a single value. Typically this is done by `sum(a_i * b_i)`, but can be arbitrary. The function returns a new function which can be used to perform the whole convolution on two arrays.

The following example is the same as the `convolve` function above.

```ts
import { convolveArbitrary } from "convolution"

const convolutionStepFunction = (a, b) => {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
}

const convolve = convolveArbitrary(convolutionStepFunction)

const a = [1, 2, 3]
const b = [1, 2, 3]

const result = convolve(a, b)
// result = [1, 4, 10, 12, 9]
```

## Supported Typed Arrays

- Array
- Int8Array
- Uint8Array
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array

## Contribute

All feedback is appreciated. Create a pull request or write an issue.
