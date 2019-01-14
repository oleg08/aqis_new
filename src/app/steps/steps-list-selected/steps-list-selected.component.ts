import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../../interfaces/step';

@Component({
  selector: 'app-aqis-steps-list-selected',
  templateUrl: './steps-list-selected.component.html',
  styleUrls: ['./steps-list-selected.component.scss']
})
export class StepsListSelectedComponent implements OnInit {

  cols: any[];
  selectedSteps: Step[] = [];

  @Input() steps: Step[];
  @Output() addTopSteps: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
    const self = this;
    self.cols = [
      { field: 'order', header: 'Order' },
      { field: 'name', header: 'Name' }
    ];
  }

  addGeneralSteps () {
    const self = this;
    const ids: number[] = [];
    self.selectedSteps.forEach(s => ids.push(s.id));
    self.addTopSteps.emit({ step_ids: ids });
    self.selectedSteps = [];
  }

}
