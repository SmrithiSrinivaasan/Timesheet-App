import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class FilterProject implements Action {
  readonly type = ActionTypes.FILTER_PROJECT; // goes to reducer
  constructor(public payload: string) {}
}
