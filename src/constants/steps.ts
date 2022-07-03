const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export const steps = [
  HOUR,
  4 * HOUR,
  8 * HOUR,
  DAY,
  2 * DAY,
  3 * DAY,
  5 * DAY,
  8 * DAY,
  11 * DAY,
  15 * DAY,
  19 * DAY,
  23 * DAY,
  27 * DAY,
  31 * DAY,
  40 * DAY,
  55 * DAY,
  75 * DAY,
  99 * DAY,
];

export const calcNextRepeatTime = (lastDate: string, step: number) => {
  const nextDate = new Date(new Date(lastDate).getTime() + steps[step])
  return nextDate
}
