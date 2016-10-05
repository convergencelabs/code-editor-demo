import { ADD_NEW_NODE } from '../constants/ActionTypes';

import data from '../data';

export default function projectFiles(state = data, action) {
  switch (action.type) {
    case ADD_NEW_NODE:
      return state;
    default:
      return state;
  }
}