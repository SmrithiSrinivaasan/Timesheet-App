import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as EntriesAction from './store/actions/fetchEntries';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private dbPath = '/entries';
  entryRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase, private store: Store<any>) {
    this.entryRef = db.list(this.dbPath);
  }

  addEntry(data: any) {
    return this.entryRef.push(data);
  }

  editEntry(key: string, data: any) {
    return this.entryRef.update(key, data);
  }

  getEntries() {
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const role = authDetails && authDetails.auth && authDetails.auth.role;
    const user = authDetails && authDetails.auth;

    this.entryRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            const date = new Date(null);
            date.setSeconds(parseInt(c.payload.val().seconds, 10));
            const totalHours = date.toISOString().substr(11, 5);
            return {
              id: index + 1,
              key: c.key,
              date: moment(c.payload.val().date).format('YYYY-MM-DD'),
              name: c.payload.val().name,
              phase: c.payload.val().phase,
              project: c.payload.val().project,
              seconds: totalHours,
              task: c.payload.val().task,
              uid: c.payload.val().uid,
              workFrom: c.payload.val().workFrom,
            };
          })
        )
      )
      .subscribe(datas => {
        // datas has all the entries from the db
        if (role === environment.Role.Admin) {
          this.store.dispatch(new EntriesAction.FetchEntries(datas));
        } else {
          const filteredData = datas.filter(data => data.uid === user.uid);
          this.store.dispatch(new EntriesAction.FetchEntries(filteredData));
        }
      });
  }

  // getEntries() {
  //   return this.entryRef;
  // }

  selectedEntryByKey(key: string) {
    return this.db.database
      .ref(this.dbPath)
      .orderByKey()
      .equalTo(key)
      .once('value');
  }
}
