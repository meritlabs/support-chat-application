export function validateInitMessage(message) {
  let result = 'valid';

  if (message === undefined) result = 'empty';

  return result;
}
