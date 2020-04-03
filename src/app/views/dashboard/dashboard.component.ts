import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { chain, sum } from 'lodash';
import * as moment from 'moment';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../environments/environment';
import { EntryService } from '../entry/entry.service';
import { ProjectService } from '../project/project.service';
import { DashboardService } from './dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalUsers: any;
  totalProjects: any;
  totalHours = [];
  isPageLoading = false;
  projects = [];
  projectHours = [];

  constructor(
    private dashboardService: DashboardService,
    private projectService: ProjectService,
    private store: Store<any>,
    private entryService: EntryService
  ) {
    this.entryService.getEntries();
  }

  ngOnInit(): void {
    this.loadProject();

    if (this.isAdmin()) {
      this.loadAdminDashboard();
    } else {
      this.loadUserDashboard();
    }
  }

  loadProject() {
    this.projectService
      .getProjects()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map((c: any, index: number) => {
            return {
              name: c.payload.val().name,
              key: c.payload.key,
            };
          })
        )
      )
      .subscribe(datas => {
        this.projects = datas;
      });
  }

  loadAdminDashboard() {
    this.isPageLoading = true;

    this.dashboardService
      .getDashboardData()
      .snapshotChanges()
      .pipe(
        map((
          changes // like 2 for loops
        ) =>
          changes.map((c: any, index: number) => {
            return {
              [c.payload.key]: c.payload.val(),
            };
          })
        )
      )
      .subscribe((datas: any) => {
        // new data is updated from service file
        this.totalProjects = datas[0].projects;
        this.totalUsers = datas[2].users;

        const hours = datas[1].totalHours;
        Object.keys(hours).map(key => {
          const secondsToHours = this.secondsToHms(hours[key]);
          this.projects.find(project => {
            if (project.key === key) {
              this.projectHours[key] = {
                projectName: project.name,
                totalTime: secondsToHours === '' ? 0 : secondsToHours,
              };
            }
          });
        });
        this.totalHours = Object.values(this.projectHours);
        this.isPageLoading = false;
      });
  }

  loadUserDashboard() {
    this.isPageLoading = true;
    this.store.pipe(select('entries')).subscribe(val => {
      this.totalHours = chain(val.datas)
        .groupBy('project')
        .map((value, key) => {
          const totalSeconds = [];
          value.map((data: any) => {
            totalSeconds.push(moment.duration(data.seconds).asSeconds());
          });
          const summedTotalSeconds = sum(totalSeconds);
          const secondsToHours = this.secondsToHms(summedTotalSeconds);

          return {
            projectName: key,
            totalTime: secondsToHours === '' ? 0 : secondsToHours,
          };
        })
        .value();
      this.totalHours = this.totalHours.filter(
        totalHour => totalHour.projectName !== 'leave'
      );
      this.isPageLoading = false;
    });
  }

  secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '';
    const mDisplay =
      m > 0 ? ', ' + m + (m === 1 ? ' minute ' : ' minutes ') : '';
    const sDisplay = s > 0 ? ', ' + s + (s === 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  isAdmin() {
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const role = authDetails && authDetails.auth && authDetails.auth.role;
    return role === environment.Role.Admin;
  }
}
