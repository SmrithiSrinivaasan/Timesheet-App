import { Actions } from '../actions';
import { ActionTypes } from '../actionTypes';
// it will automatically take index, if we give other name apart from index then specify it

const initialState: any = {
  datas: [],
  project: 'all',
  phase: 'all',
  user: 'all',
};

export function entryReducer(state: any = initialState, action: Actions) {
  switch (action.type) {
    // action is from payload

    case ActionTypes.FETCH_ENTRIES:
      return {
        ...state,
        datas: [...action.payload],
      };

    case ActionTypes.FILTER_PROJECT:
      return {
        ...state,
        project: action.payload,
      };

    case ActionTypes.FILTER_PHASE:
      return {
        ...state,
        phase: action.payload,
      };

    case ActionTypes.FILTER_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return {
        ...state,
        // shows init state only
      };
  }
}
