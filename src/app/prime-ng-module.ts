import {NgModule} from '@angular/core';

import {
  CarouselModule,
  ButtonModule,
  DialogModule,
  GrowlModule,
  ConfirmDialogModule,
  InputMaskModule,
  SidebarModule,
  MultiSelectModule,
  DataGridModule,
  DataListModule,
  DragDropModule
} from 'primeng/primeng';

import { MessageService      } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { TooltipModule       } from 'primeng/tooltip';
import { DataTableModule     } from 'primeng/datatable';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule      } from 'primeng/dropdown';
import { FieldsetModule      } from 'primeng/fieldset';
import { InputTextModule     } from 'primeng/inputtext';
import { MessagesModule      } from 'primeng/messages';
import { MessageModule       } from 'primeng/message';
import { CalendarModule      } from 'primeng/calendar';
import { OrderListModule     } from 'primeng/orderlist';
import { SliderModule        } from 'primeng/slider';
import { AutoCompleteModule  } from 'primeng/autocomplete';
import { InputSwitchModule   } from 'primeng/primeng';
import { OverlayPanelModule  } from 'primeng/overlaypanel';
import { TableModule         } from 'primeng/table';
import { EditorModule        } from 'primeng/editor';
import { InplaceModule       } from 'primeng/inplace';
import { CardModule          } from 'primeng/card';
import { ToolbarModule       } from 'primeng/toolbar';
import { ProgressSpinnerModule  } from 'primeng/progressspinner';
import { PickListModule         } from 'primeng/picklist';
import { PanelModule            } from 'primeng/panel';
import { PasswordModule         } from 'primeng/password';
import { DataViewModule         } from 'primeng/dataview';
import { SelectButtonModule     } from 'primeng/selectbutton';
import { AccordionModule        } from 'primeng/accordion';
import { ProgressBarModule      } from 'primeng/progressbar';
import { TabViewModule          } from 'primeng/tabview';
import { CheckboxModule         } from 'primeng/checkbox';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { RadioButtonModule      } from 'primeng/radiobutton';
import { VirtualScrollerModule  } from 'primeng/virtualscroller';
import { ToggleButtonModule     } from 'primeng/togglebutton';
import { TreeTableModule        } from 'primeng/primeng';
import { ChipsModule            } from 'primeng/primeng';

@NgModule({
  exports: [
    CarouselModule,
    ButtonModule,
    DialogModule,
    GrowlModule,
    ConfirmDialogModule,
    InputMaskModule,
    SidebarModule,
    MultiSelectModule,
    DataGridModule,
    DataListModule,
    DragDropModule,
    TooltipModule,
    DataTableModule,
    InputTextareaModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    OrderListModule,
    SliderModule,
    AutoCompleteModule,
    InputSwitchModule,
    OverlayPanelModule,
    TableModule,
    EditorModule,
    InplaceModule,
    CardModule,
    ToolbarModule,
    ProgressSpinnerModule,
    PickListModule,
    PanelModule,
    PasswordModule,
    DataViewModule,
    SelectButtonModule,
    AccordionModule,
    ProgressBarModule,
    TabViewModule,
    CheckboxModule,
    TriStateCheckboxModule,
    RadioButtonModule,
    VirtualScrollerModule,
    ToggleButtonModule,
    TreeTableModule,
    ChipsModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]
})

export class PrimeNgModule {}
