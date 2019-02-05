import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aqis-steps',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  path = 'steps';
  templates_path = 'main_email_templates';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
