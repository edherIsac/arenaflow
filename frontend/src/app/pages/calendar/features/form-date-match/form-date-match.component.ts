import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FilterPlayersPipe } from 'src/app/shared/pipes/filter-players.pipe';

export interface Player {
  id: number;
  name: string;
  number: number;
  isStarter: boolean;
  isSubstitute: boolean;
  goals: number;
  yellowCards: number;
  redCard: boolean;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  score: number;
  players: Player[];
}

@Component({
  selector: 'app-form-date-match',
  templateUrl: './form-date-match.component.html',
  styleUrls: ['./form-date-match.component.scss'],
  standalone: false
})
export class FormDateMatchComponent implements OnInit {
  matchForm: FormGroup;
  activeTeamTab: 'home' | 'away' = 'home';
  matchDate: Date = new Date();
  
  
  homeTeam: Team = {
    id: 1,
    name: 'Equipo Local',
    logo: 'assets/img/equipo1.png',
    score: 0,
    players: this.generatePlayers(11, true)
  };

  awayTeam: Team = {
    id: 2,
    name: 'Equipo Visitante',
    logo: 'assets/img/equipo1.png',
    score: 0,
    players: this.generatePlayers(11, false)
  };

  constructor(
    private fb: FormBuilder,
  ) {
    this.matchForm = this.fb.group({
      homeScore: [0],
      awayScore: [0],
      homePlayers: this.fb.array([]),
      awayPlayers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    // Inicializar form arrays para jugadores
    const homePlayers = this.matchForm.get('homePlayers') as FormArray;
    const awayPlayers = this.matchForm.get('awayPlayers') as FormArray;

    this.homeTeam.players.forEach(player => {
      homePlayers.push(this.createPlayerFormGroup(player));
    });

    this.awayTeam.players.forEach(player => {
      awayPlayers.push(this.createPlayerFormGroup(player));
    });
  }

  private createPlayerFormGroup(player: Player): FormGroup {
    return this.fb.group({
      id: [player.id],
      name: [player.name],
      number: [player.number],
      isStarter: [player.isStarter],
      isSubstitute: [player.isSubstitute],
      goals: [player.goals],
      yellowCards: [player.yellowCards],
      redCard: [player.redCard]
    });
  }

  private generatePlayers(count: number, isHome: boolean): Player[] {
    const players: Player[] = [];
    const teamPrefix = isHome ? 'LOC' : 'VIS';
    
    // Generar titulares (primeros 11)
    for (let i = 1; i <= count; i++) {
      players.push({
        id: parseInt(`${isHome ? 1 : 2}${i.toString().padStart(2, '0')}`),
        name: `Jugador ${teamPrefix} ${i}`,
        number: i,
        isStarter: i <= 11,
        isSubstitute: i > 11,
        goals: 0,
        yellowCards: 0,
        redCard: false
      });
    }
    
    // Generar suplentes (siguientes 7)
    for (let i = 1; i <= 7; i++) {
      players.push({
        id: parseInt(`${isHome ? 1 : 2}${(i + 11).toString().padStart(2, '0')}`),
        name: `Suplente ${teamPrefix} ${i}`,
        number: i + 11,
        isStarter: false,
        isSubstitute: true,
        goals: 0,
        yellowCards: 0,
        redCard: false
      });
    }
    
    return players;
  }

  onScoreChange(team: 'home' | 'away', increment: boolean): void {
    const scoreControl = team === 'home' ? 'homeScore' : 'awayScore';
    const currentScore = this.matchForm.get(scoreControl)?.value || 0;
    const newScore = increment ? currentScore + 1 : Math.max(0, currentScore - 1);
    this.matchForm.get(scoreControl)?.setValue(newScore);
    
    if (team === 'home') {
      this.homeTeam.score = newScore;
    } else {
      this.awayTeam.score = newScore;
    }
  }

  onPlayerEvent(playerId: number, event: 'goal' | 'yellow' | 'red'): void {
    const allPlayers = [...this.homeTeam.players, ...this.awayTeam.players];
    const player = allPlayers.find(p => p.id === playerId);
    
    if (!player) return;
    
    switch (event) {
      case 'goal':
        player.goals++;
        break;
      case 'yellow':
        player.yellowCards = Math.min(2, player.yellowCards + 1);
        if (player.yellowCards >= 2) {
          player.redCard = true;
        }
        break;
      case 'red':
        player.redCard = true;
        break;
    }
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      const matchResult = {
        homeTeam: {
          id: this.homeTeam.id,
          score: this.homeTeam.score
        },
        awayTeam: {
          id: this.awayTeam.id,
          score: this.awayTeam.score
        },
        players: [...this.homeTeam.players, ...this.awayTeam.players]
          .filter(p => p.goals > 0 || p.yellowCards > 0 || p.redCard)
          .map(p => ({
            id: p.id,
            goals: p.goals,
            yellowCards: p.yellowCards,
            redCard: p.redCard
          }))
      };
      console.log('Match result submitted:', matchResult);
      // Aquí iría la lógica para guardar el resultado del partido
    }
  }

  onCancel(): void {
    // Aquí iría la lógica para cancelar la edición
    console.log('Match result editing cancelled');
  }
}
