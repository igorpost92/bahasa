export const removeDiacritics = (text: string) => {
  return text
    .replace(/í/g, 'i')
    .replace(/á/g, 'a')
    .replace(/ó/g, 'o')
    .replace(/é/g, 'e')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n');
};
