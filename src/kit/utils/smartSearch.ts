import { removeDiacritics } from './removeDiacritics';

const identityFn = (text: string) => text;

interface Options {
  ignoreDiacritics?: boolean;
}

// TODO: tests
export function smartSearch<T extends Record<string, any>>(
  collection: T[],
  searchString: string,
  fields: keyof T | (keyof T)[],
  options?: Options,
) {
  if (!searchString) {
    return collection;
  }

  const convertor = options?.ignoreDiacritics ? removeDiacritics : identityFn;

  const searchParts = convertor(searchString.toLowerCase()).split(' ');

  const fieldsList = Array.isArray(fields) ? fields : [fields];

  const result = collection.filter(item => {
    return fieldsList.some(field => {
      const data = convertor(String(item[field]).toLowerCase());

      const matched = searchParts.every(part => {
        if (!part) {
          return true;
        }

        return data.includes(part);
      });

      return matched;
    });
  });

  return result;
}
