export function validateSms(query) {
  if (!query.from) {
    return "from is missing";
  }
  if (!query.to) {
    return "to is missing";
  }
  if (!query.text) {
    return "text is missing";
  }
  if (query.from.length < 6 || query.from.length > 16) {
    return "from is invalid";
  }
  if (query.to.length < 6 || query.to.length > 16) {
    return "to is invalid";
  }
  if (query.text.length < 1 || query.text.length > 120) {
    return "text is invalid";
  }
  return "";
}
