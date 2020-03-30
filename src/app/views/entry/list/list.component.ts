import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../../environments/environment';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';
import { UserService } from '../../user/user.service';
import { EntryService } from '../entry.service';
import * as FilterPhase from '../store/actions/filterPhase';
import * as FilterProject from '../store/actions/filterProject';
import * as FilterUser from '../store/actions/filterUser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {
  isPageLoading = false;
  entries = [];
  users = [];
  projects = [];
  phases = [];

  selectedProject: string;
  selectedPhase: string;
  selectedUser: string;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private phaseService: PhaseService,
    private router: Router,
    private entryService: EntryService,
    private store: Store<any>
  ) {
    this.entryService.getEntries();
    this.loadData();
  }

  ngOnInit(): void {
    this.userService
      .getUsers()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              label: c.payload.val().name,
              value: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        console.log(datas);
        const user = {
          label: 'All Users',
          value: 'all',
        };
        this.users = [user, ...datas];
      });

    this.projectService
      .getProjects()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              label: c.payload.val().name,
              value: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        const project = {
          label: 'All Projects',
          value: 'all',
        };
        this.projects = [project, ...datas];
      });

    this.phaseService
      .getPhases()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              label: c.payload.val().name,
              value: c.payload.val().name,
            };
          })
        )
      )
      .subscribe(datas => {
        const phase = {
          label: 'All Phases',
          value: 'all',
        };

        this.phases = [phase, ...datas];
      });

    // this.entryService
    //   .getEntries()
    //   .snapshotChanges()
    //   .pipe(
    //     map(changes =>
    //       changes.map((c: any, index: number) => {
    //         const date = new Date('all');
    //         date.setSeconds(parseInt(c.payload.val().seconds, 10));
    //         const totalHours = date.toISOString().substr(11, 5);
    //         return {
    //           id: index + 1,
    //           key: c.key,
    //           date: moment(c.payload.val().date).format('DD-MM-YYYY'),
    //           name: c.payload.val().name,
    //           phase: c.payload.val().phase,
    //           project: c.payload.val().project,
    //           seconds: totalHours,
    //           task: c.payload.val().task,
    //           uid: c.payload.val().uid,
    //           workFrom: c.payload.val().workFrom,
    //         };
    //       })
    //     )
    //   )
    //   .subscribe(datas => {
    //     // datas has all the entries from the db
    //     if (role === environment.Role.Admin) {
    //       this.entries = datas;
    //     } else {
    //       this.entries = datas.filter(data => data.uid === user.uid);
    //     }
    //     this.isPageLoading = false;
    //   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.isPageLoading = true;

    this.subscription = this.store.pipe(select('entries')).subscribe(val => {
      console.log(val);
      this.selectedProject = val.project;
      this.selectedPhase = val.phase;
      this.selectedUser = val.user;

      if (
        this.selectedProject === 'all' &&
        this.selectedPhase === 'all' &&
        this.selectedUser === 'all'
      ) {
        this.entries = val.datas;
      } else {
        this.entries = filter(val.datas, {
          project: this.selectedProject,
          phase: this.selectedPhase,
          user: this.selectedUser,
        });
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

  onChangeProject() {
    console.log(this.selectedProject);
    this.store.dispatch(new FilterProject.FilterProject(this.selectedProject));
    this.loadData();
  }

  onChangePhase() {
    console.log(this.selectedPhase);
    this.store.dispatch(new FilterPhase.FilterPhase(this.selectedPhase));
    this.loadData();
  }

  onChangeUser() {
    console.log(this.selectedUser);
    this.store.dispatch(new FilterUser.FilterUser(this.selectedUser));
    this.loadData();
  }
}
