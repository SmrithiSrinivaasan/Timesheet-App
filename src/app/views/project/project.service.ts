import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private dbPath = '/projects';
  projectRef: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.projectRef = db.list(this.dbPath);
  }

  addProject(data: any) {
    return this.projectRef.push(data);
  }

  getProjects() {
    return this.projectRef;
  }
}
