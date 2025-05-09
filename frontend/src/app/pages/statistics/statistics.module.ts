import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StandingsTableComponent } from './components/standings-table/standings-table.component';

@NgModule({
  declarations: [StandingsTableComponent],
  imports: [CommonModule, FormsModule, StatisticsRoutingModule],
  exports: [StandingsTableComponent]
})
export class StatisticsModule {}
