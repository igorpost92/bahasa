import { Notifier } from '../kit';

type Events = 'words-update' | 'categories-update' | 'verbs-update';

export const notifier = new Notifier<Events>();
