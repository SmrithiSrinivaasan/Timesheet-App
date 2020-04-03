import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class FetchEntries implements Action {
  readonly type = ActionTypes.FETCH_ENTRIES; // goes to reducer
  constructor(public payload: any) {}
}
