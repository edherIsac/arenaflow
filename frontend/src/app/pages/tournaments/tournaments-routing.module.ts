import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsLayoutComponent } from './components/tournaments-layout/tournaments-layout.component';
import { TournamentsListComponent } from './components/tournaments-list/tournaments-list.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentsLayoutComponent,
    children: [
      {
        path: '',
        component: TournamentsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
