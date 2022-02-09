export const formatStatCardNumber = (value: number): string => {
  return value
    .toLocaleString(undefined, {
      maximumFractionDigits: 2,
      // maximumFractionDigits: value >= 1_000_000 ? 1 : 2,
      notation: value >= 10_000 ? 'compact' : undefined
    })
    .toLowerCase();
};

/**
 * Format words into Capitalize except "of and the" words
 * @param "director of operations"
 * @returns "Director of Operations"
 */
export const formatCapitalizeWord = (value: string) => {
  const excludedWords = ['of', 'the'];
  if (!value) {
    return '';
  }

  let arr: Array<string> = [];
  arr = value.split(' ');

  return arr
    .map((word, i) => {
      return excludedWords.includes(word) && i !== 0 ? [word] : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
