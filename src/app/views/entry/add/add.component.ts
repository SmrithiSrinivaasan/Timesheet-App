import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/internal/operators/map';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  projects = [];
  phases = [];

  entryForm = this.formBuilder.group({
    workFrom: [null, [Validators.required]],
    hours: ['', [Validators.required]],
    project: [null, [Validators.required]],
    phase: [null, [Validators.required]],
    task: ['', [Validators.required]],
  });
  workTypes = [
    { key: 'Office', value: 'Office' },
    { key: 'Home', value: 'Home' },
    { key: 'Leave', value: 'Leave' },
  ];
  selectedworkType = this.workTypes[0].key;

  constructor(
    private projectService: ProjectService,
    private phaseService: PhaseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private entryService: EntryService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
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

  get workFrom() {
    return this.entryForm.get('workFrom');
  }

  get hours() {
    return this.entryForm.get('hours');
  }

  get project() {
    return this.entryForm.get('project');
  }

  get phase() {
    return this.entryForm.get('phase');
  }

  get task() {
    return this.entryForm.get('task');
  }

  onWorkTypeChange() {
    const formValue = this.entryForm.value;

    if (this.selectedworkType === 'Leave') {
      this.entryForm.patchValue({
        hours: '00:00',
        project: 'leave',
        phase: 'leave',
        task: 'leave',
      });
    } else {
      this.entryForm.patchValue({
        hours:
          formValue.workFrom !== 'Leave' && formValue.project === 'leave'
            ? ''
            : formValue.hours,
        project:
          formValue.workFrom !== 'Leave' && formValue.project === 'leave'
            ? ''
            : formValue.project,
        phase:
          formValue.workFrom !== 'Leave' && formValue.project === 'leave'
            ? ''
            : formValue.phase,
        task:
          formValue.workFrom !== 'Leave' && formValue.project === 'leave'
            ? ''
            : formValue.task,
      });
    }
  }

  onSave() {
    const authDetails = JSON.parse(localStorage.getItem('auth'));
    const user = authDetails && authDetails.auth;
    const entries = this.entryForm.value;
    const data = {
      name: user.name,
      uid: user.uid,
      date: moment
        .utc()
        .local()
        .format('YYYY-MM-DDTHH:mm:ss.SSS'),
      workFrom: entries.workFrom,
      seconds: moment
        .duration(entries.hours)
        .asSeconds()
        .toString(),
      project: entries.project,
      phase: entries.phase,
      task: entries.task,
    };
    this.entryService
      .addEntry(data)
      .then(() => {
        this.toast.success('Entry Created Successfully');
        this.router.navigate(['entry']);
      })
      .catch((dbError: any) => {
        this.toast.error(dbError.message);
      });
  }

  onBack() {
    this.router.navigate(['/entry']);
  }
}
