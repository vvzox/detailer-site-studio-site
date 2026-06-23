import { normalizeContactEmail } from './contact-validation.mjs';

export function buildMailtoUrl(destination, fields = {}) {
  const normalizedDestination = normalizeContactEmail(destination);
  if (normalizedDestination === null) {
    throw new Error('destination email is required');
  }

  const subject = 'Question about a detailing website direction';
  const body = [
    `Name: ${fields.name ?? ''}`,
    `Service: ${fields.service ?? ''}`,
    '',
    fields.message ?? '',
  ].join('\n');

  return `mailto:${normalizedDestination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
