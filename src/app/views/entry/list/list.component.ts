import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, omitBy, uniqBy } from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../../../environments/environment';
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
    private router: Router,
    private entryService: EntryService,
    private store: Store<any>
  ) {
    this.entryService.getEntries();
    this.loadData();
  }

  ngOnInit(): void {
    this.store.pipe(select('entries')).subscribe(val => {
      const allUsers = [];
      const allProjects = [];
      const allPhases = [];
      if (val.datas.length > 0) {
        val.datas.map(data => {
          allUsers.push({
            label: data.name,
            value: data.name,
          });
          allProjects.push({
            label: data.project,
            value: data.project,
          });
          allPhases.push({
            label: data.phase,
            value: data.phase,
          });
        });
      }
      const user = {
        label: 'All Users',
        value: 'all',
      };
      const project = {
        label: 'All Projects',
        value: 'all',
      };
      const phase = {
        label: 'All Phases',
        value: 'all',
      };
      const uniqueUsers = uniqBy(allUsers, 'label');
      const uniqueProjects = uniqBy(allProjects, 'label');
      const uniquePhases = uniqBy(allPhases, 'label');

      this.users = [user, ...uniqueUsers];
      this.projects = [project, ...uniqueProjects];
      this.phases = [phase, ...uniquePhases];
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
