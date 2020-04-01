import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { DashboardService } from '../../dashboard/dashboard.service';
import { PhaseService } from '../../phase/phase.service';
import { ProjectService } from '../../project/project.service';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  projects = [];
  phases = [];

  entryForm = this.formBuilder.group({
    workFrom: [null, [Validators.required]],
    hours: ['', [Validators.required]],
    project: [null, [Validators.required]],
    phase: [null, [Validators.required]],
    task: ['', [Validators.required]],
  });

  key: string;
  entryDetail: any;
  isPageLoading = false;
  isLoading = false;

  workTypes = [
    { key: 'Office', value: 'Office' },
    { key: 'Home', value: 'Home' },
    { key: 'Leave', value: 'Leave' },
  ];
  selectedworkType = this.workTypes[0].key;

  oldProjectID: any;
  oldProjectName: string;
  oldSeconds: string;

  constructor(
    private projectService: ProjectService,
    private phaseService: PhaseService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
              key: c.payload.key,
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

    this.route.params.subscribe(params => {
      this.key = params.id;
    });
    this.entryService
      .selectedEntryByKey(this.key)
      .then((response: any) => {
        this.entryDetail = Object.values(response.val())[0];
        // object.values takes only the details without the key from reponse.val()
        // an array is created and the 0th element of the array is the object with the values.
        const date = new Date(null);
        this.oldSeconds = this.entryDetail.seconds;
        this.oldProjectName = this.entryDetail.project;
        date.setSeconds(parseInt(this.entryDetail.seconds, 10));
        const totalHours = date.toISOString().substr(11, 5);
        this.entryForm.patchValue({
          workFrom: this.entryDetail.workFrom,
          hours: totalHours,
          project: this.entryDetail.project,
          phase: this.entryDetail.phase,
          task: this.entryDetail.task,
        });
        this.isPageLoading = false;
      })
      .catch((error: any) => {
        this.isPageLoading = false;
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
    this.isLoading = true;

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
    const filteredProject = this.projects.find(
      project => project.name === entries.project
    );
    this.oldProjectID = this.projects.find(
      project => project.name === this.oldProjectName
    );

    this.entryService
      .editEntry(this.key, data)
      .then(() => {
        this.dashboardService.removeTotalhours(
          this.oldProjectID.key,
          this.oldSeconds
        );
        this.dashboardService.updateTotalHours(
          filteredProject.key,
          data.seconds
        );
        this.entryForm.reset();
        this.toast.success('Entry Updated Successfully');
        this.isLoading = false;
        this.router.navigate(['entry']);
      })
      .catch((dbError: any) => {
        this.toast.error(dbError.message);
        this.isLoading = false;
      });
  }

  onBack() {
    this.router.navigate(['/entry']);
  }

  canDeactivate() {
    if (this.entryForm.dirty) {
      return window.confirm('Discard Changes?');
    }
    return true;
  }
}
