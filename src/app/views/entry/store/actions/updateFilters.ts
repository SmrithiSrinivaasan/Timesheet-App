import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class UpdateFilters implements Action {
  readonly type = ActionTypes.UPDATE_FILTER; // goes to reducer
  constructor(public payload: any) {}
}
