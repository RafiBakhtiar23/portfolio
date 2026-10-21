// mailto link with a ready subject line, so the email Rafi receives is easy to recognise.
import { site, ui } from '../data/site.js';

export const mailHref = (lang) => `mailto:${site.email}?subject=${encodeURIComponent(ui[lang].mailSubject)}`;
