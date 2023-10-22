import BigNumber from 'bignumber.js';
import {CoinBalance} from '@mysten/sui.js/client';

const ELLIPSIS = '\u{2026}';

/**
 * Formats an Sui address for display by truncating it in the middle with an ellipsis.
 *
 * @param {string} address - The Sui address to format.
 * @return {string} The formatted Sui addressin format 0xd607…62eb.
 */
export function formatAddress(address: string): string {
  if (address.length <= 6) {
    return address;
  }

  const offset = address.startsWith('0x') ? 2 : 0;

  return `0x${address.slice(offset, offset + 4)}${ELLIPSIS}${address.slice(-4)}`;
}

/**
 * Formats a digest string by truncating it to the first 10 characters and appending an ellipsis.
 *
 * @param {string} digest - The digest string to format.
 * @return {string} The formatted digest string.
 */
export function formatDigest(digest: string): string {
  return `${cutDigest(digest)}${ELLIPSIS}`;
}

/**
 * Cuts a digest string by truncating it to the first 10 characters.
 *
 * @param {string} digest - The digest string to cut.
 * @return {string} The truncated digest string.
 */
export function cutDigest(digest: string): string {
  return `${digest.slice(0, 10)}`;
}

/**
 * Formats a numeric string as a decimal amount with up to 9 decimal places.
 *
 * @param {string} input - The numeric string to format.
 * @return {string} The formatted decimal amount.
 */
export function formatAmount(input: string): string {
  if (input.length < 10) {
    return `0.${input.padStart(9, '0')}`;
  } else {
    const wholePart = input.slice(0, -9);
    const fractionalPart = input.slice(-9);
    return `${wholePart}.${fractionalPart}`;
  }
}

/**
 * Converts a numeric price string into a SUI (SUI-wei) format string with up to 3 decimal places.
 *
 * @param {string | undefined} price - The numeric price string to convert.
 * @return {string | undefined} The converted SUI format string or undefined if the
 * input is undefined.
 */
export function fromNumberToSui(price: string | undefined): string | undefined {
  if (!price) {
    return undefined;
  }

  return returnAmountFromArray(formatAmount(price).split('.'));
}

/**
 * Removes trailing zeroes from a numeric string.
 *
 * @param {string | undefined} val - The input numeric string possibly containing trailing zeroes.
 * @return {string | undefined} A new string with trailing zeroes removed, or undefined if the
 * input is undefined or empty.
 *
 * @example
 * // Returns '123.45'
 * removeZeroes('123.4500');
 *
 * // Returns '0.5'
 * removeZeroes('0.5000');
 *
 * // Returns undefined
 * removeZeroes(undefined);
 */
export function removeZeroes(val: string | undefined): string | undefined {
  if (!val) {
    return undefined;
  }

  return returnAmountFromArray(val.split('.'));
}

/**
 * Calculate the percentage difference between an initial value and a current value.
 *
 * @param {string} init - The initial value.
 * @param {string} curr - The current value.
 * @return {string} A string representing the percentage difference, rounded to two decimal places.
 *
 * @throws {Error} If either 'init' or 'curr' is not a valid numeric string.
 *
 * @example
 * // Returns '25.00'
 * getFilled('100', '75');
 *
 * // Returns '-10.53'
 * getFilled('19.99', '22.32');
 *
 * // Throws an error because 'init' is not a valid numeric string.
 * getFilled('invalid', '50');
 */
export function getFilled(init: string, curr: string): string {
  return new BigNumber(init)
    .minus(new BigNumber(curr))
    .dividedBy(new BigNumber(init))
    .multipliedBy(100)
    .toFixed(2);
}

/**
 * Formats a SUI (Sui Generis Unit) value to a whole SUI string, removing leading and trailing
 * zeros.
 *
 * @param {string} sui - The SUI value to format.
 * @return {string} The formatted whole SUI string.
 * @example
 * // Returns '1.123'
 * formatToWholeSui('1123000000');
 */
export function formatToWholeSui(sui: string | undefined): string {
  return removeZeroes(fromNumberToSui(sui)) ?? '';
}

/**
 * Get the balance of a specific asset in a list of CoinBalance objects.
 *
 * @param {CoinBalance[]} allTokens - An array of CoinBalance objects containing asset balances.
 * @param {string} asset - The asset for which you want to retrieve the balance.
 * @return {string} The total balance of the specified asset, or an empty string if not found.
 */
export function getTokenBalance(allTokens: CoinBalance[], asset: string): string {
  return allTokens.find((c) => c.coinType === asset)?.totalBalance ?? '';
}

/**
 * Formats an array of string values as a single string with up to three decimal places.
 *
 * This function takes an array of string values representing a numerical amount,
 * and it formats them as a single string with up to three decimal places. If the array contains
 * two elements, it joins them with a dot (.) separator, keeping up to three decimal places.
 *  If the array contains only one element, it  returns that element as is.
 *
 * @param {string[]} amountArr - An array of string values representing a numerical amount.
 * @return {string} The formatted numerical amount as a string.
 */
export function returnAmountFromArray(amountArr: string[]): string {
  return amountArr.length > 1
    ? [amountArr[0], amountArr[1].substring(0, 3)].join('.')
    : amountArr[0];
}

/**
 * Converts a price value from SUI (Subunit) to Wei (the smallest unit of SUI).
 *
 * This function takes a price value as a string in SUI (Subunit) format and converts
 * it to Wei format.
 * SUI is a format where the price can have up to 9 decimal places represented as a string.
 * Wei is the smallest unit of SUI, and it does not use decimal places.
 *
 * @param {string} price - The price value in SUI format (e.g., "123.456789123").
 * @return {string} The price value converted to Wei format as a string.
 */
export function fromSuiToWei(price: string): string {
  const priceRaw = (price ?? '0').split('.');

  return priceRaw.length > 1
    ? [priceRaw[0], priceRaw[1].padEnd(9, '0')].join('')
    : new BigNumber(1000000000).multipliedBy(priceRaw[0]).toString().split('.')[0];
}

/**
 * Calculate and retrieve the percentage value of a given amount.
 *
 * @param {string | undefined} amount - The input amount as a string.
 * @param {string | undefined} percent - The percentage to be applied as a string.
 * @return {string} The calculated percentage value as a string.
 */
export function getPercentFromAMount(
  amount: string | undefined | null,
  percent: number | undefined | null,
): string {
  if (!amount || !percent) {
    return '';
  }

  return new BigNumber(amount).div(100).multipliedBy(percent).toString().split('.')[0];
}

/**
 * Calculate the result of multiplying a percentage by an amount and dividing by 100.
 *
 * @param {string | undefined | null} total - The total value.
 * @param {number | undefined | null} percent - The percentage to apply.
 * @param {number | undefined | null} amount - The amount to be multiplied by the percentage.
 * @return {string} The result of multiplying the percentage by the amount and dividing by 100
 * as a string.
 * If any of the input values (total, percent, or amount) are falsy, an empty string is returned.
 */
export function getPercenMulByAmount(
  total: string | undefined | null,
  percent: number | undefined | null,
  amount: string | undefined | null,
): string {
  if (!total || !amount || !percent) {
    return '';
  }

  return new BigNumber(total)
    .div(100)
    .multipliedBy(percent)
    .multipliedBy(amount)
    .toString()
    .split('.')[0];
}

/**
 * Calculate the result of dividing an amount by 100, then multiplying by a percentage.
 *
 * @param {string | undefined | null} total - The total value.
 * @param {number | undefined | null} percent - The percentage to apply.
 * @param {string | undefined | null} amount - The amount to be divided and then multiplied by
 * the percentage.
 * @return {string} The result of dividing the amount by 100, multiplying by the percentage,
 * and returning it as a string.
 * If any of the input values (total, percent, or amount) are falsy, an empty string is returned.
 */
export function getPercenDivByAmount(
  total: string | undefined | null,
  percent: number | undefined | null,
  amount: string | undefined | null,
): string {
  if (!total || !amount || !percent) {
    return '';
  }

  return new BigNumber(total).div(amount).div(100).multipliedBy(percent).toString().split('.')[0];
}
