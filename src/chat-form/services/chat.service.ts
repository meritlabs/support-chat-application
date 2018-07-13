export function validateInitMessage(message) {
  let result = 'valid';

  if (message === undefined) result = 'empty';
  if (message && message.length < 10) result = `Please describe your question more deeply.`;

  return result;
}
