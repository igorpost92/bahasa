export function smartSearch<T extends Record<string, any>>(
  collection: T[],
  field: keyof T,
  searchString: string,
) {
  const searchParts = searchString.toLowerCase().split(' ');

  const result = collection.filter(item => {
    const data = String(item[field]).toLowerCase();

    const matched = searchParts.every(part => {
      if (!part) {
        return true;
      }

      return data.includes(part);
    });

    return matched;
  });

  return result;
}
