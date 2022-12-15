import { JSDOM } from 'jsdom';
import { privateSupabase } from './request';
import { verbsConfigByTitles } from '../constants/verbsConfig';

const logLine = (text: string) => {
  // TODO:
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(text);
};

const getVerbs = async (full = false) => {
  let promise = privateSupabase
    .from<{ id: string; text: string }>('words')
    .select('id, text')
    .match({ lang: 'ES', type: 'verb', email: 'patrickx3@yandex.ru' });

  if (!full) {
    const existingVerbs = await privateSupabase
      .from<{ word_id: string }>('verbs')
      .select('word_id');

    // console.log('existingVerbs', { error: existingVerbs.error, data: existingVerbs.data });

    if (existingVerbs.data) {
      const existingIds = existingVerbs.data.map(item => item.word_id);
      promise = promise.not('id', 'in', `(${existingIds})`);
    }
  }

  const result = await promise;
  // console.log('words', { error: result.error, data: result.data });

  const { data } = result;

  if (!data) {
    console.log('no words found', result);
    return [];
  }

  return data;
};

const markVerbs = async () => {
  const result = await privateSupabase
    .from('words')
    .select('id, text, type')
    .is('type', null)
    .match({ lang: 'ES', email: 'patrickx3@yandex.ru' });

  const possible = result.data?.filter(({ text }) => text !== 'mujer' && text.endsWith('ir')) ?? [];

  for (let i = 0; i < possible.length; i++) {
    const w = possible[i];
    // console.log('w', w.id);

    // await privateSupabase
    //   .from('words')
    //   .update({
    //     type: 'verb',
    //   })
    //   .match({ id: w.id });
  }

  console.log(possible);

  return result.data;
};

type WordItem = Record<string, string[]>;

const getDataForVerb = async (verb: string) => {
  const url = encodeURI(
    `https://glagol.reverso.net/спряжение-испанский-глагол-${verb}.html`,
  ).trim();

  const result: WordItem = {};

  const dom = await JSDOM.fromURL(url, {
    // pretendToBeVisual: true,
  });

  const blocks = dom.window.document.querySelectorAll('.result-block-api .blue-box-wrap');

  blocks.forEach(block => {
    const title = block.getAttribute('mobile-title')?.trim();
    const config = verbsConfigByTitles[title ?? ''];

    if (!title || !config) {
      return;
    }

    const valueNodes = block.querySelectorAll('li .verbtxt');

    const values = [...(valueNodes as any)].map(node => node.innerHTML);

    const isCorrect = values.every(Boolean);

    if (isCorrect) {
      result[config.key] = values;
    }
  });

  return result;
};

// TODO:
interface TensesData {
  word_id: string;
  name: string;
  data: string;
}

const syncData = async (data: TensesData[]) => {
  try {
    // await privateSupabase.from('verbs').delete().not('id', 'is', null);
    await privateSupabase.from('verbs').upsert(data);

    console.log('sync data ok');
  } catch (e) {
    console.error('sync data error');
    console.error(e);
  }
};

const prepareVerbs = async (full = false) => {
  const verbs = await getVerbs(full);

  if (!verbs.length) {
    console.log('no verbs found');
    return;
  }

  console.log(
    'verbs',
    verbs.length,
    verbs.map(item => item.text),
  );

  const result: TensesData[] = [];

  // TODO: run in parallel
  for (let i = 0; i < verbs.length; i++) {
    const { id, text } = verbs[i];

    try {
      logLine(`${i + 1}/${verbs.length}: ${text}`);
      const data = await getDataForVerb(text);
      result.push({ word_id: id, name: text, data: JSON.stringify(data) });
    } catch (e) {
      console.log('\n', 'error when loading: ', text);
    }
  }

  console.log('');

  if (!result.length) {
    console.log('no result after requests');
    return;
  }

  console.log(result);

  let save;
  save = false;
  save = true;
  if (save) {
    syncData(result);
  }
};

prepareVerbs();
// markVerbs();
