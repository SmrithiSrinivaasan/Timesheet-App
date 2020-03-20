import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class PhaseService {
  private dbPath = '/phases';
  phaseRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.phaseRef = db.list(this.dbPath);
  }

  addPhase(data: any) {
    return this.phaseRef.push(data);
  }

  // editPhase(key: string, data: any) {
  //   return this.phaseRef.update(key, data);
  // }

  // deletePhase(key: string) {
  //   return this.phaseRef.remove(key);
  // }
  // getPhases() {
  //   return this.phaseRef;
  // }
}
