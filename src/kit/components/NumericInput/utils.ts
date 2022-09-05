const HYPHEN = '-'; // &#45 (keyboard hyphen)
const MINUS_SIGN = '−'; // &#8722
const LONG_DASH = '—'; // &#8212
const MIDDLE_DASH = '–'; // &#8211

const wrongMinusesPattern = `[${MINUS_SIGN}${LONG_DASH}${MIDDLE_DASH}]`;

export const sanitizeNumberInput = (input: string) => {
  return input
    .replace(new RegExp(wrongMinusesPattern), HYPHEN)
    .replace(/[./бю]/gi, ',')
    .replace(/[^\d-,]/g, '')
    .replace(/(?!^)-/g, '') // all minuses not at start
    .replace(/^,/, '0,')
    .replace(/^-,/, '-0,')

    // replace all separators but first
    .replace(',', '%%')
    .replace(/,/g, '')
    .replace(/%%/g, ',')

    // replace leading zero
    .replace(/^0(?=[0-9])/, '');
};
