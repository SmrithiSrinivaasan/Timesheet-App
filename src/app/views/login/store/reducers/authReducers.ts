import { IAuthState } from '../../model';

import { Actions} from '../actions';
import { ActionTypes } from '../actionTypes';
// it will automatically take index, if we give other name apart from index then specify it

const initialState: IAuthState = {
  auth: {
    uid: '',
    name: '',
    email: '',
    isLoggedIn: false
    // initial value
  }
};
export function authReducer(state: IAuthState = initialState, action: Actions ) {
  switch (action.type) {
    // action is from payload

    case ActionTypes.UPDATE_AUTH_DETAILS:
    return {
        auth: action.payload
        // passes values to the auth object
      };

    case ActionTypes.CLEAR_AUTH_DETAILS:
      return {
        auth: initialState.auth
        // make it back to initail state
      };

    default:
      return {
      ...state
      // shows init state only
    };

  }
}
