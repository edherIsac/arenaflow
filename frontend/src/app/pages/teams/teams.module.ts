import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamAdminComponent } from './components/team-admin/team-admin.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchPlayerComponent } from './feature/search-player/search-player.component';
import { PlayerDetailsComponent } from './feature/player-details/player-details.component';

@NgModule({
  declarations: [
    TeamAdminComponent,
    TeamFormComponent,
    SearchPlayerComponent,
    PlayerDetailsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class TeamsModule { }
