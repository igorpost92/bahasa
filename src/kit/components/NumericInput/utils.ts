const HYPHEN = '-'; // &#45 (keyboard hyphen)
const MINUS_SIGN = '−'; // &#8722
const LONG_DASH = '—'; // &#8212
const MIDDLE_DASH = '–'; // &#8211

const wrongMinusesPattern = `[${MINUS_SIGN}${LONG_DASH}${MIDDLE_DASH}]`;

const EMPTY_VALUE = '';
const DECIMAL_SEPARATOR = ',';

export const stringifyNumber = (value: number | null | undefined) => {
  if (value == null) {
    return EMPTY_VALUE;
  }

  if (Object.is(value, -0)) {
    return '-0';
  }

  return String(value).replace(/\./g, DECIMAL_SEPARATOR);
};

export const parseNumber = (input: string) => {
  if (input === EMPTY_VALUE || input === '-') {
    return null;
  }
  return Number(input.replace(/,/g, '.'));
};

export const sanitizeNumberInput = (input: string) => {
  return (
    input
      .replace(new RegExp(wrongMinusesPattern), HYPHEN)

      // replace leading zero
      .replace(/^0-/, '-')
      .replace(/^0(?=[0-9])/, '')

      .replace(/[./бю]/gi, DECIMAL_SEPARATOR)
      .replace(/[^\d\-,]/g, '')
      .replace(/(?!^)-/g, '') // all minuses not at start
      .replace(/^,/, `0${DECIMAL_SEPARATOR},`)
      .replace(/^-,/, `-0${DECIMAL_SEPARATOR},`)

      // replace all separators but first
      .replace(DECIMAL_SEPARATOR, '%%')
      .replace(/,/g, '')
      .replace(/%%/g, DECIMAL_SEPARATOR)
  );
};

export const isDecimalNumberPending = (input: string) => {
  const hasSeparator = input.includes(DECIMAL_SEPARATOR);
  if (!hasSeparator) {
    return false;
  }

  return input.endsWith(DECIMAL_SEPARATOR) || input.endsWith('0');
};
