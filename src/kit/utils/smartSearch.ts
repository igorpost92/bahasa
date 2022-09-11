const identityFn = (text: string) => text;

export function smartSearch<T extends Record<string, any>>(
  collection: T[],
  field: keyof T,
  searchString: string,
  convertor?: (text: string) => string,
): T[];

export function smartSearch<T extends Record<string, any>>(
  collection: T[],
  fields: (keyof T)[],
  searchString: string,
  convertor?: (text: string) => string,
): T[];

// TODO: tests
export function smartSearch<T extends Record<string, any>>(
  collection: T[],
  fields: keyof T | (keyof T)[],
  searchString: string,
  convertor = identityFn,
) {
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
