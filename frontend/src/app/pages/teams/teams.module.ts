import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamAdminComponent } from './components/team-admin/team-admin.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TeamAdminComponent,
    TeamFormComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TeamsModule { }
