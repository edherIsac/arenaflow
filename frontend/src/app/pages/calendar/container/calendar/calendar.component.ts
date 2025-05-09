import { Component, OnInit } from '@angular/core';

interface Category {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  categoryId: number;
}

interface Team {
  id: number;
  name: string;
  groupId: number;
}

interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  date: Date;
  time: string;
  venue: string;
  round: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  categories: Category[] = [
    { id: 1, name: 'Femenil' },
    { id: 2, name: 'Reservas' },
    { id: 3, name: 'Especiales' },
    { id: 4, name: 'Premier' },
    { id: 5, name: 'Veteranos Premier' },
    { id: 6, name: 'Veteranos B' },
    { id: 7, name: 'Veteranos C' },
    { id: 8, name: 'Master Premier' },
    { id: 9, name: 'Master Oro' },
  ];

  groups: Group[] = [
    { id: 1, name: 'Grupo A', categoryId: 3 },
    { id: 2, name: 'Grupo B', categoryId: 3 },
    { id: 3, name: 'Grupo Único', categoryId: 1 },
    { id: 4, name: 'Grupo Único', categoryId: 2 },
  ];

  teams: Team[] = [
    { id: 1, name: 'Equipo 1', groupId: 1 },
    { id: 2, name: 'Equipo 2', groupId: 1 },
    { id: 3, name: 'Equipo 3', groupId: 1 },
    { id: 4, name: 'Equipo 4', groupId: 1 },
  ];

  matches: Match[] = [];

  selectedCategory: Category | null = null;
  selectedGroup: Group | null = null;
  currentRound: number = 1;

  ngOnInit() {
    // Inicialización inicial
  }

  onCategorySelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const categoryId = Number(target.value);
    const category = this.categories.find((c) => c.id === categoryId);
    if (category) {
      this.selectedCategory = category;
      this.groups = this.groups.filter((g) => g.categoryId === category.id);
      this.selectedGroup = null;
      this.matches = [];
    }
  }

  onGroupSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const groupId = Number(target.value);
    const group = this.groups.find((g) => g.id === groupId);
    if (group) {
      this.selectedGroup = group;
      this.teams = this.teams.filter((t) => t.groupId === group.id);
      
      // Resetear jornada actual
      this.currentRound = 1;
      
      // Generar calendario de partidos automáticamente
      this.createMatchSchedule();
      
      // Cargar partidos de la primera jornada
      this.loadMatches(group.id, this.currentRound);
    }
  }

  loadMatches(groupId: number, round: number) {
    // Filtrar partidos por jornada
    const matchesForRound = this.matches.filter(match => match.round === round);
    
    // Si no hay partidos para la jornada actual, mostrar mensaje
    if (matchesForRound.length === 0) {
      this.matches = [];
      console.warn(`No hay partidos programados para la jornada ${round}`);
    } else {
      this.matches = matchesForRound;
    }
  }

  createMatchSchedule() {
    // Usar equipos del grupo seleccionado
    if (!this.selectedGroup) {
      console.warn('Debe seleccionar un grupo primero');
      return;
    }

    const teams = this.teams.filter(t => t.groupId === this.selectedGroup!.id);

    // Verificar que haya suficientes equipos
    if (teams.length < 4) {
      console.warn(`El grupo ${this.selectedGroup!.name} necesita al menos 4 equipos`);
      return;
    }

    // Algoritmo de round-robin para ida y vuelta
    const totalTeams = teams.length;
    const rounds = totalTeams - 1;
    const halfTeams = totalTeams / 2;

    this.matches = [];
    let matchId = 1;

    // Generar calendario de ida
    for (let round = 1; round <= rounds; round++) {
      const roundMatches = [];
      const teamsCopy = [...teams];
      const firstTeam = teamsCopy.shift()!;

      roundMatches.push({
        id: matchId++,
        homeTeamId: firstTeam.id,
        awayTeamId: teamsCopy[halfTeams - 1].id,
        date: new Date(2024, 0, round * 7), // Sábados
        time: '16:00',
        venue: 'Estadio Principal',
        round: round
      });

      for (let match = 0; match < halfTeams - 1; match++) {
        const homeTeam = teamsCopy[match];
        const awayTeam = teamsCopy[totalTeams - 1 - match];

        roundMatches.push({
          id: matchId++,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          date: new Date(2024, 0, round * 7), // Sábados
          time: '16:00',
          venue: 'Estadio Principal',
          round: round
        });
      }

      // Rotar equipos para la siguiente jornada
      teamsCopy.splice(1, 0, teamsCopy.pop()!);
      this.matches.push(...roundMatches);
    }

    // Generar calendario de vuelta (intercambiando locales y visitantes)
    const returnMatches = this.matches.map(match => ({
      ...match,
      id: matchId++,
      homeTeamId: match.awayTeamId,
      awayTeamId: match.homeTeamId,
      round: match.round + rounds,
      date: new Date(match.date.getFullYear(), match.date.getMonth(), match.date.getDate() + rounds * 7)
    }));

    this.matches.push(...returnMatches);
    
    // Ordenar partidos por jornada y fecha
    this.matches.sort((a, b) => a.round - b.round || a.date.getTime() - b.date.getTime());

    // Cargar partidos de la primera jornada
    this.loadMatches(this.selectedGroup.id, 1);
  }

  editMatch(match: Match){
    console.log(match);
  }

  getHomeTeamName(match: Match): string {
    const team = this.teams.find(t => t.id === match.homeTeamId);
    return team ? team.name : 'Equipo desconocido';
  }

  getAwayTeamName(match: Match): string {
    const team = this.teams.find(t => t.id === match.awayTeamId);
    return team ? team.name : 'Equipo desconocido';
  }
}
