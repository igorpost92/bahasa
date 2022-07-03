export const shuffle = <T>(arr: T[]) =>
  arr.sort(() => Math.random() - 0.5);
