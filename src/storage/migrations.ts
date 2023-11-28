import { LocalStorageTokens } from '../constants/localStorageTokens';

const VERSION = 0;

const updates = new Map<number, () => Promise<void>>();

export const runMigrations = async () => {
  const currentVersion = Number(localStorage.getItem(LocalStorageTokens.CurrentVersion) || 0);

  if (currentVersion >= VERSION) {
    return;
  }

  for (let v = currentVersion + 1; v <= VERSION; v++) {
    const migration = updates.get(v);
    if (migration) {
      await migration();
      console.log(`Migration ${v} - success`);
    }
    localStorage.setItem(LocalStorageTokens.CurrentVersion, String(v));
  }
};
