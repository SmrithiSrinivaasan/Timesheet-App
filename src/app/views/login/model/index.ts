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
