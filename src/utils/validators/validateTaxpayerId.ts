type CalculateDigitType = 'first' | 'second';

const INVALID_TAXPAYER_IDS = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const DIGIT_1_FACTORS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

const DIGIT_2_FACTORS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export const validateTaxpayerId = (taxpayerId: string): boolean => {
  if (INVALID_TAXPAYER_IDS.includes(taxpayerId)) return false;

  const matches = taxpayerId.match(/^\d{14}$/);

  if (!matches) return false;

  const firstDigit = calculateDigit(taxpayerId, 'first');
  const secondDigit = calculateDigit(taxpayerId, 'second');

  const calculatedDigits = `${firstDigit}${secondDigit}`;

  const originalDigits = taxpayerId.substring(taxpayerId.length - 2);

  if (calculatedDigits === originalDigits) return true;

  return false;
};

const calculateDigit = (
  taxpayerId: string,
  type: CalculateDigitType
): number => {
  const length =
    type === 'first' ? taxpayerId.length - 2 : taxpayerId.length - 1;

  const numbers = taxpayerId.substring(0, length);

  const factorsArray = type === 'first' ? DIGIT_1_FACTORS : DIGIT_2_FACTORS;

  const sum = numbers.split('').reduce((prev, curr, index) => {
    return prev + parseInt(curr) * factorsArray[index];
  }, 0);

  const mod = sum % 11;

  if (mod === 0 || mod === 1) return 0;

  return 11 - mod;
};
