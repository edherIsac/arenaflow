import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'tournaments',
    loadChildren: () => import('./pages/tournaments/tournaments.module').then(m => m.TournamentsModule)
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'teams',
        loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('./pages/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'tournaments' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
