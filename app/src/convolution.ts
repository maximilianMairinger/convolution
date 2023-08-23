type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array


export function convolveArbitrary<T, List extends T extends number ? (Array<T> | TypedArray) : (Array<T>)>(convolutionStepFunction: (a: List, b: List) => T) {
  return function convolve(a: List, b: List) {
    const List = (a as any).constructor as typeof Array<T> | ({ new(len: number): TypedArray } & { new(ar: Iterable<number>): TypedArray } & {prototype: TypedArray})
    const aReversed = (a instanceof Array ? [...a] : new (a as any).constructor(a)).reverse()
    const bReversed = (b instanceof Array ? [...b] : new (a as any).constructor(b)).reverse()
    // const bReversed = b
    const result = new List(a.length + (b as any).length - 1)

      
    for (let i = 0; i < (a as TypedArray).length; i++) {
      const commonLength = Math.min(i + 1, (b as TypedArray).length)
      const toBeConvA = new List(commonLength)
      const toBeConvB = new List(commonLength)
      
      const missingLengthFromX = i + 1 - commonLength
      for (let j = 0; j < commonLength; j++) {
        toBeConvA[j] = (a as TypedArray)[missingLengthFromX + j]
        toBeConvB[j] = (b as TypedArray)[j]
      }
      toBeConvB.reverse()
      result[i] = convolutionStepFunction(toBeConvA as List, toBeConvB as List)
    }
    
    for (let i = 0; i < (b as TypedArray).length - 1; i++) {
      const commonLength = Math.min((a as TypedArray).length, (b as TypedArray).length - i - 1)
      const toBeConvA = new List(commonLength)
      const toBeConvB = new List(commonLength)
      const missingLengthFromY = (b as TypedArray).length - i - 1 - commonLength
      for (let j = 0; j < commonLength; j++) {
        toBeConvA[j] = (aReversed as TypedArray)[j]
        toBeConvB[j] = (bReversed as TypedArray)[missingLengthFromY + j]
      }
      toBeConvA.reverse()
      result[(a as TypedArray).length + i] = convolutionStepFunction(toBeConvA as List, toBeConvB as List)
    }
    

    return result
  }
}


export const convolve = convolveArbitrary((a: TypedArray | number[], b: TypedArray | number[]) => {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
})

export default convolve

