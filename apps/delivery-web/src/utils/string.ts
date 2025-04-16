/**
 * Normalizes text by removing accents/diacritical marks
 * Useful for accent-insensitive text search
 *
 * @param text The text to normalize
 * @returns Normalized text without accents
 */
export const normalizeText = (text: string): string => {
  return text
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .toLowerCase(); // Convert to lowercase for case-insensitive comparison
};
