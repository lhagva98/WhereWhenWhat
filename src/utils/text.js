

export function threeDot(text,maxTextLength = 53) {
  if (text.length > maxTextLength) return text.substr(0, maxTextLength) + '...';
  return text;
}
