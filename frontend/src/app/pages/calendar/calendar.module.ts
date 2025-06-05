import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './container/calendar/calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormDateMatchComponent } from './features/form-date-match/form-date-match.component';
import { FilterPlayersPipe } from 'src/app/shared/pipes/filter-players.pipe';

@NgModule({
  declarations: [
    CalendarComponent,
    FormDateMatchComponent,
    FilterPlayersPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule for ngModel
    CalendarRoutingModule,
    SharedModule
  ]
})
export class CalendarModule { }
