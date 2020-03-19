import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatPseudoCheckbox } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dbPath = '/dashboard';
  dashboardRef: AngularFireList < any > = null;

  constructor(private db: AngularFireDatabase) {
    this.dashboardRef = db.list(this.dbPath);
  }

  // getDashboardCount() {
  //   this.dashboardRef.valueChanges();
  // }
  // addDashboardCount(id, childName) {
  //   this.dashboardRef.
  // }
}
