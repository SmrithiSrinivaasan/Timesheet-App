import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dbPath = '/dashboard';
  dashboardRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.dashboardRef = db.list(this.dbPath);
  }

  addDashboardCount(name: string) {
    const currentCount = this.db.database.ref(this.dbPath);
    currentCount.ref.once('value').then(snapshot => {
      const obj = snapshot.val();
      currentCount.update({
        [name]: obj && obj[name] ? obj[name] + 1 : 1,
        // obj checks dashboard & obj[name] check for name oda count
      });
    });
  }

  getDashboardData() {
    return this.dashboardRef;
  }

  removeDashboardCount(name: string) {
    const currentCount = this.db.database.ref(this.dbPath);
    currentCount.ref.once('value').then(snapshot => {
      const obj = snapshot.val();
      currentCount.update({
        [name]: obj && obj[name] ? obj[name] - 1 : 0,
        // obj checks dashboard & obj[name] check for name oda count
      });
    });
  }

  // when project is created
  addTotalHours(key: string) {
    const totalHours = this.db.database.ref(this.dbPath + '/totalHours');
    totalHours.update({
      [key]: 0,
    });
  }

  // when entry is created
  updateTotalHours(key: string, seconds: string) {
    const totalHours = this.db.database.ref(this.dbPath + '/totalHours');
    totalHours.ref.once('value').then(snapshot => {
      const obj = snapshot.val();
      const totalSeconds = obj[key] || 0;
      totalHours.update({
        [key]: totalSeconds + Number(seconds),
      });
    });
  }

  removeTotalhours(oldProjectID: string, oldSeconds: string) {
    const totalHours = this.db.database.ref(this.dbPath + '/totalHours');
    totalHours.ref.once('value').then(snapshot => {
      const obj = snapshot.val();
      const totalSeconds = obj[oldProjectID];
      totalHours.update({
        [oldProjectID]: totalSeconds - Number(oldSeconds),
      });
    });
  }
}
