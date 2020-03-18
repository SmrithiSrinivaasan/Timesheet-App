import { Action } from '@ngrx/store';
import { IAuthDetails } from '../../model';
import { ActionTypes } from '../actionTypes';

export class UpdateAuth implements Action {
  // this class will be called from login.component.ts file
  readonly type = ActionTypes.UPDATE_AUTH_DETAILS; // goes to reducer
  constructor(public payload: IAuthDetails) {} // pass the values from login to authReducer thru this function
}
// payload of type authDet only
