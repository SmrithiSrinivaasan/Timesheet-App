import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/users';
  userRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
  }

  addUser(data: any) {
    const key = data.email.replace('.', '_dot_');
    return this.userRef.update(key, data);
  }

  getSelectedUser(key: string) {
    return this.db.database
      .ref(this.dbPath)
      .child(key)
      .once('value');
  }
}
