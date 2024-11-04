export const sum: (...args: number[]) => number = (...args: number[]) => args.reduce((prev, curr) => prev + curr)
