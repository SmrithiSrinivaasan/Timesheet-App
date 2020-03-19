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

  editProject(key: string, data: any) {
    return this.projectRef.update(key, data);
  }

  deleteProject(key: string) {
    return this.projectRef.remove(key);
  }
  getProjects() {
    return this.projectRef;
  }
}
