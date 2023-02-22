export const genInputRange = (itemSize: number, index: number, ) => {
    return [
      (index - 2) * itemSize,
      (index - 1) * itemSize,
      index * itemSize,
    ]
  }