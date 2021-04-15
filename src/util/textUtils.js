export const capitalize = (text) => {
  const words = text.split(" ");
  const capitalizedWords = words.map((w) => {
    const firstLetter = w[0].toUpperCase();
    return firstLetter + w.slice(1);
  });
  return capitalizedWords.join(" ");
};
