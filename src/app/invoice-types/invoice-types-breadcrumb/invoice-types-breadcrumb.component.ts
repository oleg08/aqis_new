import {Component, Input, OnInit} from '@angular/core';

export interface InvoiceTypesBreadcrumb {
  name: string;
  path: string;
}

@Component({
  selector: 'app-aqis-invoice-types-breadcrumb',
  templateUrl: './invoice-types-breadcrumb.component.html',
  styleUrls: ['./invoice-types-breadcrumb.component.scss']
})
export class InvoiceTypesBreadcrumbComponent implements OnInit {

  @Input() breadcrumbList: InvoiceTypesBreadcrumb[];

  constructor() { }

  ngOnInit() {
  }

}
