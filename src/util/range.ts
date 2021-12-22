export const range = (start: number, end?: number): number[] =>
  [...Array(end ?? start)].map((_, i) => i + (!!end ? 1 : start))
