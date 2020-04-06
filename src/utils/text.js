const maxTextLength = 53;

export function threeDot(text) {
  if (text.length > maxTextLength) return text.substr(0, maxTextLength) + '...';
  return text;
}
