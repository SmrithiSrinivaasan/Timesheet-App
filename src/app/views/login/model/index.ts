export interface IAuthDetails {
  uid: string;
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}
// I is due to lint error
// mentioning only types

export interface IAuthState {
  auth: IAuthDetails;
}

// it is global so that it can be accessed by all files, like service action ets
