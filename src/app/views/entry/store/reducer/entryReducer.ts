import { Actions } from '../actions';
import { ActionTypes } from '../actionTypes';
// it will automatically take index, if we give other name apart from index then specify it

const initialState: any = {
  datas: [],
  filters: {
    project: 'all',
    phase: 'all',
    name: 'all',
    fromDate: '',
    toDate: '',
  },
};

export function entryReducer(state: any = initialState, action: Actions) {
  switch (action.type) {
    // action is from payload

    case ActionTypes.FETCH_ENTRIES:
      return {
        ...state,
        datas: [...action.payload],
      };

    case ActionTypes.UPDATE_FILTER:
      return {
        ...state,
        filters: action.payload,
      };

    case ActionTypes.CLEAR_ENTRIES:
      return {
        datas: [],
        filters: {
          project: 'all',
          phase: 'all',
          name: 'all',
          fromDate: '',
          toDate: '',
        },
      };

    default:
      return {
        ...state,
        // shows init state only
      };
  }
}
