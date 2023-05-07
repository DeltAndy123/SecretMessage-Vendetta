/**
 * Replaces multiple substrings in a string with new substrings.
 * @param {string} string - The string to perform replacements on.
 * @param {Object.<string, string>} replacements - An object mapping substrings to their replacements.
 * @returns {string} The resulting string after performing all replacements.
 */
export function bulkReplace(
  string: string,
  replacements: { [key: string]: string },
): string {
  for (const [key, value] of Object.entries(replacements)) {
    string = string.replaceAll(key, value);
  }
  return string;
}