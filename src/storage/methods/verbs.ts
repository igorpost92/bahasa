import { db } from '../db';

export const getVerbs = async () => {
  const verbs = await db.verbs.toArray();
  return verbs;
};
