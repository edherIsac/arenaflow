import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlayersRoutingModule } from './players-routing.module';
import { AdminPlayersComponent } from './components/admin-players/admin-players.component';
import { PlayerComponent } from './components/player/player.component';


@NgModule({
  declarations: [
    AdminPlayersComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayersRoutingModule
  ]
})
export class PlayersModule { }
