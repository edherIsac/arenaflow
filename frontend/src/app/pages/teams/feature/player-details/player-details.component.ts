import { Component, Input } from '@angular/core';

interface PlayerStats {
  wins: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  gamesPlayed: number;
}

interface Player {
  id: string;
  name: string;
  lastName: string;
  position: string;
  sport: string;
  age: number;
  height: string;
  weight: string;
  nationality: string;
  team: string;
  jerseyNumber: number;
  stats: PlayerStats;
  bio: string;
  avatar: string;
}

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent {
  @Input() player: Player = {
    id: '1',
    name: 'Lionel',
    lastName: 'Messi',
    position: 'Delantero',
    sport: 'Fútbol',
    age: 36,
    height: '1.70 m',
    weight: '72 kg',
    nationality: 'Argentina',
    team: 'Inter Miami',
    jerseyNumber: 10,
    avatar: 'https://example.com/messi.jpg',
    bio: 'Considerado uno de los mejores jugadores de fútbol de todos los tiempos. Ganador de 8 Balones de Oro y múltiples títulos tanto a nivel de clubes como con su selección nacional.',
    stats: {
      wins: 42,
      goals: 32,
      assists: 18,
      yellowCards: 3,
      redCards: 0,
      gamesPlayed: 45
    }
  };
}
