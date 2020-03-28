import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';

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
    private router: Router
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

  onSave() {}

  onBack() {
    this.router.navigate(['/entry']);
  }
}
