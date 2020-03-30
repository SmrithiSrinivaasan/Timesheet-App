import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class FilterUser implements Action {
  readonly type = ActionTypes.FILTER_USER; // goes to reducer
  constructor(public payload: string) {}
}
