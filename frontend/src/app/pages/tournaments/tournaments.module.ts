import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentsLayoutComponent } from './components/tournaments-layout/tournaments-layout.component';
import { TournamentsListComponent } from './components/tournaments-list/tournaments-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TournamentsLayoutComponent,
    TournamentsListComponent
  ],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class TournamentsModule { }
