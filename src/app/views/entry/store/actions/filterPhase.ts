import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class FilterPhase implements Action {
  readonly type = ActionTypes.FILTER_PHASE; // goes to reducer
  constructor(public payload: string) {}
}
