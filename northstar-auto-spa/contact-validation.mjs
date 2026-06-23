const emailPattern = /^[A-Za-z0-9]+(?:[._+-][A-Za-z0-9]+)*@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:\.[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)+$/;

export function normalizeContactEmail(value) {
  if (typeof value !== 'string' || /\p{Cc}/u.test(value)) {
    return null;
  }

  const normalized = value.trim();
  if (
    normalized === ''
    || /\s/u.test(normalized)
    || /[?#&]/.test(normalized)
    || !emailPattern.test(normalized)
  ) {
    return null;
  }

  return normalized;
}
