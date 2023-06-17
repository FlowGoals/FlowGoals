export interface Goal {
  name: string,
  start_val: number,
  cur_val: number,
  end_val: number,
  created_dt: string,
  interval: number,
  category?: string,
  color?: string,
}
