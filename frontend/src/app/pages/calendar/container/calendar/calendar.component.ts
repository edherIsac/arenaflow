import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  logo?: string;
}

interface Match {
  id?: number;
  homeTeamId: number;
  awayTeamId: number;
  date: Date;
  time: string;
  venue: string;
  round: number;
  status?: 'pending' | 'in_progress' | 'completed' | 'postponed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // Form
  calendarForm: FormGroup;

  // Data
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
    { id: 1, name: 'Grupo A', categoryId: 1 },
    { id: 2, name: 'Grupo B', categoryId: 2 },
    { id: 3, name: 'Grupo Único', categoryId: 4 },
  ];

  teams: Team[] = [
    { id: 1, name: 'Equipo 1', groupId: 1 },
    { id: 2, name: 'Equipo 2', groupId: 1 },
    { id: 3, name: 'Equipo 3', groupId: 1 },
    { id: 4, name: 'Equipo 4', groupId: 1 },
    { id: 5, name: 'Equipo 5', groupId: 2 },
    { id: 6, name: 'Equipo 6', groupId: 2 },
  ];

  // State
  selectedCategoryId: number | null = null;
  selectedGroupId: number | null = null;
  currentRound: number = 1;
  totalRounds: number = 5;
  currentMatches: Match[] = [];

  // Sample venues
  venues: string[] = [
    'Estadio Principal',
    'Cancha 1',
    'Cancha 2',
    'Sede Alterna',
  ];

  constructor(private fb: FormBuilder) {
    this.calendarForm = this.fb.group({
      category: [''],
      group: [''],
    });
  }

  ngOnInit(): void {
    // Initialize with first category selected
    if (this.categories.length > 0) {
      this.selectedCategoryId = this.categories[0].id;
      this.onCategoryChange();
    }
  }

  onCategoryChange(): void {
    // Reset group selection when category changes
    this.selectedGroupId = null;
    this.currentMatches = [];

    // In a real app, you would fetch groups for the selected category
    // For now, we're using the mock data
    this.loadMatchesForGroup();
  }

  onGroupChange(): void {
    if (this.selectedGroupId) {
      this.currentRound = 1;
      this.loadMatchesForGroup();
    }
  }

  generateRoundRobinMatches(teams: Team[], rounds: number = 1): Match[] {
    const matches: Match[] = [];
    const totalTeams = teams.length;

    if (totalTeams < 2) {
      return [];
    }

    // Create a copy of the teams array to avoid modifying the original
    const teamList = [...teams];

    // If odd number of teams, add a dummy team for byes
    const hasBye = totalTeams % 2 !== 0;
    if (hasBye) {
      teamList.push({ id: -1, name: 'BYE', groupId: -1 });
    }

    const numTeams = teamList.length;
    const numRounds = numTeams - 1;
    const matchesPerRound = Math.floor(numTeams / 2);

    // Generate matches for each round
    for (let round = 1; round <= numRounds * rounds; round++) {
      const roundMatches: Match[] = [];

      // Create matches for this round
      for (let i = 0; i < matchesPerRound; i++) {
        const homeIndex = (round - 1 + i) % (numTeams - 1);
        let awayIndex = (numTeams - 1 - i + round - 1) % (numTeams - 1);

        // Last team stays in the same position while the others rotate
        if (i === 0) {
          awayIndex = numTeams - 1;
        }

        const homeTeam = teamList[homeIndex];
        const awayTeam = teamList[awayIndex];

        // Skip if either team is the BYE team
        if (homeTeam.id === -1 || awayTeam.id === -1) {
          continue;
        }

        // Alternate home/away for return matches in subsequent rounds
        const isReturnMatch = round > numRounds;
        const homeTeamFinal = isReturnMatch ? awayTeam : homeTeam;
        const awayTeamFinal = isReturnMatch ? homeTeam : awayTeam;

        // Calculate match date (one week between rounds)
        const matchDate = new Date();
        matchDate.setDate(matchDate.getDate() + (round - 1) * 7);

        roundMatches.push({
          homeTeamId: homeTeamFinal.id,
          awayTeamId: awayTeamFinal.id,
          date: matchDate,
          time: this.getRandomTime(),
          venue: this.venues[Math.floor(Math.random() * this.venues.length)],
          round: Math.ceil(round / 2), // Group rounds in pairs (home and away)
          status: 'pending',
        });
      }

      // Add matches for this round to the result
      matches.push(...roundMatches);
    }

    return matches;
  }

  // Helper function to generate random match times
  private getRandomTime(): string {
    const hours = Math.floor(Math.random() * 6) + 9; // Between 9 AM and 2 PM
    const minutes = Math.random() > 0.5 ? '00' : '30';
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  // Store all generated matches
  private allMatches: Match[] = [];

  loadMatchesForGroup(): void {
    if (!this.selectedGroupId) {
      this.currentMatches = [];
      return;
    }

    const groupTeams = this.teams.filter(
      (team) => team.groupId == this.selectedGroupId
    );

    if (groupTeams.length < 2) {
      this.currentMatches = [];
      return;
    }

    // Generate all matches if not already done
    if (this.allMatches.length == 0) {
      this.allMatches = this.generateRoundRobinMatches(groupTeams, 1); // 1 for single round-robin, 2 for double
      this.totalRounds = Math.max(...this.allMatches.map((m) => m.round), 0);
    }

    // Filter matches for the current round
    this.currentMatches = this.allMatches.filter(
      (match) => match.round == this.currentRound
    );
  }

  getTeamName(teamId: number): string {
    const team = this.teams.find((t) => t.id == teamId);
    return team ? team.name : 'Equipo Desconocido';
  }

  previousRound(): void {
    if (this.currentRound > 1) {
      this.currentRound--;
      this.loadMatchesForGroup();
    }
  }

  nextRound(): void {
    if (this.currentRound < this.totalRounds) {
      this.currentRound++;
      this.loadMatchesForGroup();
    }
  }

  generateCalendar(): void {
    if (!this.selectedGroupId) {
      return;
    }

    const groupTeams = this.teams.filter(
      (team) => team.groupId == this.selectedGroupId
    );

    if (groupTeams.length < 2) {
      alert('Se necesitan al menos 2 equipos para generar un calendario');
      return;
    }

    // Reset matches and generate new ones
    this.allMatches = [];
    this.currentRound = 1;
    this.loadMatchesForGroup();

    // Show success message with number of matches
    const totalMatches = this.allMatches.length;
    const totalRounds = this.totalRounds;
    alert(
      `Calendario generado con éxito!\nTotal de partidos: ${totalMatches}\nTotal de jornadas: ${totalRounds}`
    );
  }

  private getNextWeekendDate(): Date {
    const date = new Date();
    // Get next Saturday
    date.setDate(date.getDate() + ((6 - date.getDay() + 1) % 7));
    return date;
  }

  // Selecciones del usuario
  selectedCategory: Category | null = null;

  // Estado de la UI
  isModalVisible: boolean = false;

  handleModalClose(): void {
    this.isModalVisible = false;
  }

  editMatch(match: Match): void {
    this.isModalVisible = true;
  }
}
