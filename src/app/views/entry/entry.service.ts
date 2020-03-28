import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private dbPath = '/entries';
  entryRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.entryRef = db.list(this.dbPath);
  }

  addEntry(data: any) {
    return this.entryRef.push(data);
  }
}
