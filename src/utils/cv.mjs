// Shared CV data, rendered on both /about (inline) and /cv (dedicated page).
// Source of truth is src/content/cv.json (editable in the local admin
// panel); this module preserves the existing named imports.
import cvData from '../content/cv.json';

export const experience = cvData.experience;
export const education = cvData.education;
export const teaching = cvData.teaching;
export const awards = cvData.awards;
export const extracurricular = cvData.extracurricular;
export const skills = cvData.skills;
