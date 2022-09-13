import { Notifier } from '../kit/services/Notifier';

type Events = 'words-update' | 'categories-update';

export const notifier = new Notifier<Events>();
