import { Action } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export class ClearEntries implements Action {
  readonly type = ActionTypes.CLEAR_ENTRIES; // goes to reducer
}
