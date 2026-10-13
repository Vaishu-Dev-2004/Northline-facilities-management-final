import en from '../../locales/en.json';
import ar from '../../locales/ar.json';
import he from '../../locales/he.json';

const dictionaries = { en, ar, he };
export const getLocale = () => localStorage.getItem('northline.locale') || 'en';
export const getDirection = () => {
  const explicit = localStorage.getItem('northline.direction');
  if (explicit === 'ltr' || explicit === 'rtl') return explicit;
  return ['ar', 'he'].includes(getLocale()) ? 'rtl' : 'ltr';
};
export const t = (key) => dictionaries[getLocale()]?.[key] || en[key] || key;

export function applyDirection(direction) {
  const selected = direction === 'rtl' ? 'rtl' : 'ltr';
  localStorage.setItem('northline.direction', selected);
  document.documentElement.dir = selected;
  document.querySelectorAll('.direction-control [data-direction]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.direction === selected));
  });
  return selected;
}

export function applyLocale(locale) {
  const selected = dictionaries[locale] ? locale : 'en';
  localStorage.setItem('northline.locale', selected);
  document.documentElement.lang = selected;
  document.documentElement.dir = getDirection();
}
