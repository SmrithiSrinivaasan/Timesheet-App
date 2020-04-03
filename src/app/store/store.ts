// refer ngrxstore local storage documentation for clarity

import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { entryReducer } from '../views/entry/store/reducer/entryReducer';
import { authReducer } from '../views/login/store/reducers/authReducers';

export const FEATURE_NAME = 'Timesheet';

const STORE_KEYS_TO_PERSIST = ['auth', 'entries'];
// add next stuff in the array
export interface IStoreState {
  auth: any;
  entries: any;
  // here
}

export const reducers: ActionReducerMap<IStoreState> = {
  auth: authReducer,
  entries: entryReducer,
  // stores details in auth key
  // here also
};

export const getStoreState = createFeatureSelector<IStoreState>(FEATURE_NAME);

export function localStorageSyncReducer(
  reducer: ActionReducer<IStoreState>
): ActionReducer<IStoreState> {
  return localStorageSync({
    keys: STORE_KEYS_TO_PERSIST,
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<IStoreState, Action>> = [
  localStorageSyncReducer,
];
