import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, omitBy } from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../../environments/environment';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';
import { UserService } from '../../user/user.service';
import { EntryService } from '../entry.service';
import { UpdateFilters } from '../store/actions/updateFilters';

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
  selectedFromDate: any;
  selectedToDate: any;
  isToDateDisabled = true;
  maxDate = moment(new Date()).format('YYYY-MM-DD');

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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.isPageLoading = true;

    this.subscription = this.store.pipe(select('entries')).subscribe(val => {
      this.selectedProject = val.filters.project;
      this.selectedPhase = val.filters.phase;
      this.selectedUser = val.filters.name;
      this.selectedFromDate = val.filters.fromDate;
      this.selectedToDate = val.filters.toDate;

      if (
        this.selectedProject === 'all' &&
        this.selectedPhase === 'all' &&
        this.selectedUser === 'all' &&
        this.selectedFromDate === '' &&
        this.selectedToDate === ''
      ) {
        this.entries = val.datas;
      } else {
        const filteredKey = omitBy(
          val.filters,
          (data: any) => data === 'all' || data === ''
        );
        if (filteredKey.fromDate && filteredKey.toDate) {
          const filteredDates = filter(val.datas, data => {
            return (
              data.date >= filteredKey.fromDate &&
              data.date <= filteredKey.toDate
            );
          });
          const updatedFilterKey = filteredKey;
          delete updatedFilterKey.fromDate;
          delete updatedFilterKey.toDate;
          this.entries = filter(filteredDates, updatedFilterKey);
        } else {
          this.entries = filter(val.datas, filteredKey);
        }
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

  updateFilter() {
    const filteredData = {
      project: this.selectedProject,
      phase: this.selectedPhase,
      name: this.selectedUser,
      fromDate: this.selectedFromDate,
      toDate: this.selectedToDate,
    };
    this.store.dispatch(new UpdateFilters(filteredData));
  }

  updateDate() {
    if (this.selectedFromDate) {
      this.isToDateDisabled = false;
    } else {
      this.isToDateDisabled = true;
      this.selectedToDate = '';
      this.updateEntryFilters();
    }
    if (this.selectedFromDate && this.selectedToDate) {
      this.updateEntryFilters();
    }
  }

  updateEntryFilters() {
    const filteredData = {
      project: this.selectedProject,
      phase: this.selectedPhase,
      name: this.selectedUser,
      fromDate: this.selectedFromDate,
      toDate: this.selectedToDate,
    };
    this.store.dispatch(new UpdateFilters(filteredData));
  }
}
