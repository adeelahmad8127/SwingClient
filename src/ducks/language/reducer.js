import {UPDATE_LANGUAGE} from './types';

const initialState = {
  language: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LANGUAGE: {
      return {
        language: action.language,
      };
    }
    default:
      return state;
  }
};
