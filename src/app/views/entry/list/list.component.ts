import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../../environments/environment';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';
import { UserService } from '../../user/user.service';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  isPageLoading = false;
  entries = [];
  users = [];
  projects = [];
  phases = [];

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private phaseService: PhaseService,
    private router: Router,
    private entryService: EntryService
  ) {}

  ngOnInit(): void {
    this.isPageLoading = true;
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const role = authDetails && authDetails.auth && authDetails.auth.role;
    const user = authDetails && authDetails.auth;

    this.userService
      .getUsers()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              name: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        this.users = datas;
      });

    this.projectService
      .getProjects()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              name: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        this.projects = datas;
      });

    this.phaseService
      .getPhases()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              name: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        this.phases = datas;
      });

    this.entryService
      .getEntries()
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
              date: moment(c.payload.val().date).format('DD-MM-YYYY'),
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
          this.entries = datas;
        } else {
          this.entries = datas.filter(data => data.uid === user.uid);
        }
        this.isPageLoading = false;
      });
  }

  isAdmin() {
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const role = authDetails && authDetails.auth && authDetails.auth.role;
    return role === environment.Role.Admin;
  }

  hasEntries() {
    return this.entries.length > 0;
  }

  onAdd() {
    this.router.navigate(['/entry/add']);
  }

  onEdit(key: string) {
    this.router.navigate(['/entry/edit', key]);
  }
}
