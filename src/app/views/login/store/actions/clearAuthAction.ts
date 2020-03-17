import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class ClearAuth implements Action {
  readonly type = ActionTypes.CLEAR_AUTH_DETAILS;
}
