import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  isPageLoading = false;
  entries = ['1'];
  users = [];
  projects = [];
  phases = [];

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private phaseService: PhaseService
  ) {}

  ngOnInit(): void {
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
  }

  hasEntries() {
    return this.entries.length > 0;
  }

  onAdd() {}

  onEdit() {}
}
