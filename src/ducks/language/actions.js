import {UPDATE_LANGUAGE} from './types';

export function updateLanguage(language) {
  return {
    language,
    type: UPDATE_LANGUAGE,
  };
}
