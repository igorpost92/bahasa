// @ts-noche6ck

import { JSDOM } from 'jsdom';
import { privateSupabase } from './request';

const getVerbs = async (full = false) => {
  let promise = privateSupabase
    .from<{ id: string; text: string }>('words')
    .select('id, text')
    .match({ lang: 'ES', type: 'verb', email: 'patrickx3@yandex.ru' });

  if (!full) {
    const existingVerbs = await privateSupabase
      .from<{ word_id: number }>('verbs')
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

const titlesMap = {
  'Indicativo Presente': 'presente',
  'Indicativo Pretérito perfecto simple': 'preterito',
} as Record<string, string>;

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
    const title = block.getAttribute('mobile-title');
    const key = titlesMap[title ?? ''];

    if (!title || !key) {
      return;
    }

    // console.log(title);

    const valueNodes = block.querySelectorAll('li .verbtxt');

    if (valueNodes.length !== 6) {
      // console.log('len', values.length);
      return;
    }

    const values = [...(valueNodes as any)].map(node => node.innerHTML);

    const isCorrect = values.every(Boolean);

    if (isCorrect) {
      result[key] = values;
    }
  });

  // console.log(result);

  return result;
};

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

const prepareVerbs = async () => {
  const verbs = await getVerbs();

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
      const data = await getDataForVerb(text);
      result.push({ word_id: id, name: text, data: JSON.stringify(data) });
    } catch (e) {
      console.log('error when loading: ', text);
    }
  }

  if (!result.length) {
    console.log('no result after poquests');
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
