import { Notifier } from '../kit';

type Events = 'words-update' | 'categories-update';

export const notifier = new Notifier<Events>();
