import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsTableComponent } from './components/standings-table/standings-table.component';

const routes: Routes = [
  { path: '', component: StandingsTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {}
