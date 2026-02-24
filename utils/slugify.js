
export const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")          // replace & with 'and'
    .replace(/[^a-z0-9]+/g, "-")   // replace non-alphanumeric with -
    .replace(/^-+|-+$/g, "");      // trim - from start/end
