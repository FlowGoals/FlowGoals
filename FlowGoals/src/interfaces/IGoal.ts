export interface Goal {
  name: string,
  start: number,
  end?: number,
  current: number,
  interval: number, // 0 for non-repeating goals
  end_date?: string,
  category?: string,
  color: string,
}
