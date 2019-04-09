import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DailyReport} from '../assistant-steps-hours.component';

@Component({
  selector: 'app-aqis-daily-report-edit',
  templateUrl: './daily-report-edit.component.html',
  styleUrls: ['./daily-report-edit.component.scss']
})
export class DailyReportEditComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  @Input() report: DailyReport;
  @Output() submitValues: EventEmitter<object> = new EventEmitter<object>();
  @Output() onDelete: EventEmitter<object> = new EventEmitter<object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const self = this;
    self.editForm = self.formBuilder.group({
      description: ['', Validators.required],
      report_date: ['', Validators.required],
      hours: ['', Validators.required]
    });
  }

  get f() { return this.editForm.controls; }

  setReport(report: DailyReport) {
    const self = this;
    self.editForm.controls.description.setValue(report.description);
    self.editForm.controls.report_date.setValue(new Date(report.report_date));
    self.editForm.controls.hours.setValue(report.hours);
    self.editForm.controls.hours.setValidators([
      Validators.required,
      Validators.pattern(/^\d{1,3}$/),
      Validators.min(0),
      Validators.max(100)
    ]);
  }

  onSubmit() {
    const self = this;
    self.submitted = true;
    if (self.editForm.invalid) { return; }
    self.submitValues.emit(self.editForm.value);
  }

  delete() {
    this.onDelete.emit();
  }

}
