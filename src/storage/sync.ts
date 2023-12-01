import { db, SyncEntryDB } from './db';
import { isEqual } from 'lodash';
import { v4 } from 'uuid';
import { Table, Transaction, IndexableType } from 'dexie';

const addSyncHooks = (table: Table, tableName: SyncEntryDB['entryType']) => {
  table.hook('creating', async (primKey, obj, transaction) => {
    // TODO:
    if ((transaction as any).__sync__) {
      return;
    }

    await addToSync(transaction, tableName, primKey, obj);
    console.log(`created: ${tableName}`);
  });

  table.hook('updating', async (modifications, primKey, obj, transaction) => {
    if ((transaction as any).__sync__) {
      return;
    }

    const modificationsFields = Object.keys(modifications);

    if (!modificationsFields.length) {
      return;
    }

    transaction.storeNames;

    const hasChanges = modificationsFields.some(field => {
      const oldValue = (obj as any)[field];
      const newValue = (modifications as any)[field];
      const changed = !isEqual(oldValue, newValue);
      return changed;
    });

    if (!hasChanges) {
      console.log(`no changes: ${tableName}`);
      return;
    }

    const newObj = { ...obj, ...modifications };
    await addToSync(transaction, tableName, primKey, newObj);
    console.log(`changed: ${tableName}`);
  });

  table.hook('deleting', async (primKey, obj, transaction) => {
    if ((transaction as any).__sync__) {
      return;
    }

    await addToSync(transaction, tableName, primKey, null);
    console.log(`deleted: ${tableName}`);
  });
};

export const registerSync = (tables: Table[]) => {
  tables.forEach(table => {
    const { name } = table;
    addSyncHooks(table, name);
  });
};

const addToSync = async (
  transaction: Transaction,
  table: SyncEntryDB['entryType'],
  entryId: IndexableType,
  value: SyncEntryDB['value'],
) => {
  try {
    await db.sync.put({
      id: v4(),
      createdAt: new Date(),
      messageId: -1,
      entryType: table,
      entryId: entryId as string,
      value,
    });
  } catch (e) {
    console.log('sync error', e);
    transaction.abort();
  }
};
