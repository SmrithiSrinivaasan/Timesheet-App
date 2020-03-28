import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatPseudoCheckbox } from '@angular/material/core';

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
}
