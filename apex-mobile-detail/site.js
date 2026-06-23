import { buildMailtoUrl } from './lead-capture.mjs';

export function enhanceQuoteForm({
  documentRef = document,
  locationRef = window.location,
  FormDataClass = FormData,
  schedule = setTimeout,
  preparedDelayMs = 1200,
} = {}) {
  const form = documentRef.querySelector('form[data-email]');
  if (!form) {
    return false;
  }

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      if (status) {
        status.textContent = 'Please complete the required fields before continuing.';
        status.dataset.state = 'error';
      }
      return;
    }

    try {
      const fields = Object.fromEntries(new FormDataClass(form).entries());
      const mailtoUrl = buildMailtoUrl(form.dataset.email, fields);

      if (status) {
        status.textContent = 'Trying to open your email app…';
        status.dataset.state = 'pending';
      }
      locationRef.href = mailtoUrl;
      schedule(() => {
        if (status) {
          status.textContent = `Email draft prepared. Nothing was sent automatically. If no email app opened, email ${form.dataset.email}.`;
          status.dataset.state = 'prepared';
        }
      }, preparedDelayMs);
    } catch {
      if (status) {
        status.textContent = 'We could not prepare the email. Please email the studio directly.';
        status.dataset.state = 'error';
      }
    }
  });

  return true;
}

export function enhanceHeroMedia({ documentRef = document } = {}) {
  const figures = documentRef.querySelectorAll('.hero-media');

  for (const figure of figures) {
    const image = figure.querySelector('.hero-image');
    const fallback = figure.querySelector('.media-fallback');
    if (!image || !fallback) continue;

    const revealFallback = () => {
      image.hidden = true;
      fallback.hidden = false;
    };

    image.addEventListener('error', revealFallback);
    if (image.complete && image.naturalWidth === 0) {
      revealFallback();
    }
  }
}

if (typeof document !== 'undefined') {
  enhanceQuoteForm();
  enhanceHeroMedia();
}
