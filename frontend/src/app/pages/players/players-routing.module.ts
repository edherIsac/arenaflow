import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPlayersComponent } from './components/admin-players/admin-players.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'admin', 
    pathMatch: 'full' 
  },
  { 
    path: 'admin', 
    component: AdminPlayersComponent
  },
  { 
    path: 'form', 
    component: PlayerComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
