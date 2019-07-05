import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { CapitalizeService } from '../../services/capitalize.service';
import { InvoiceType } from '../../interfaces/invoice-type';

@Component({
  selector: 'app-aqis-invoice-type-image-loading',
  templateUrl: './invoice-type-image-loading.component.html',
  styleUrls: ['./invoice-type-image-loading.component.scss'],
  providers: [MessageService, CapitalizeService]
})
export class InvoiceTypeImageLoadingComponent implements OnInit {

  selectedFile: File = null;
  capitalizedProp: string;
  msgs: Message[] = [];

  @Input() invoice_type: InvoiceType;
  @Input() prop: string;
  @Input() loadValue: number;
  @Input() loading: boolean;
  @Output() loadImage:  EventEmitter<object> = new EventEmitter<object>();
  @Output() clearImage:  EventEmitter<object> = new EventEmitter<object>();

  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;

  constructor(private messageService: MessageService,
              private capitalizeService: CapitalizeService) { }

  ngOnInit() {
    const self = this;
    self.capitalizedProp = self.capitalizeService.capitalizeFirst(self.prop);
  }

  onFileSelected(data) {
    this.selectedFile = data.target.files[0];
  }

  onUpload() {
    const self = this;

    if (!self.selectedFile) {
      const inputFile: HTMLElement = self.inputFile.nativeElement as HTMLElement;
      inputFile.click();
      return;
    }

    if (self.selectedFile.type !== 'image/png') {
      self.messageService.add({severity: 'warn', summary: 'Warning', detail: `Must be format png`});
      self.selectedFile = null;
      return;
    }

    const fd: FormData = new FormData();
    fd.append(`${self.prop}_image`, this.selectedFile, this.selectedFile.name);

    self.loadImage.emit({ form_data: fd, prop: self.prop });
    self.selectedFile = null;
  }

  clear() {
    const self = this;
    self.clearImage.emit({ prop: self.prop });
  }
}
