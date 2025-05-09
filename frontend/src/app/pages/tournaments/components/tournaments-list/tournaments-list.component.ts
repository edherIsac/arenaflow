import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Tournament {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  date: Date;
  status: 'active' | 'upcoming' | 'finished';
  participants: number;
  maxParticipants: number;
}

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {
  tournaments: Tournament[] = [];
  filteredTournaments: Tournament[] = [];
  searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Datos de ejemplo - esto vendrá de un servicio
    this.tournaments = [
      {
        id: 1,
        name: 'Torneo de Primavera',
        description: 'Gran torneo de primavera con premios increíbles',
        imageUrl: 'assets/images/tournament1.jpg',
        date: new Date('2025-05-15'),
        status: 'upcoming',
        participants: 8,
        maxParticipants: 16
      },
      {
        id: 2,
        name: 'Copa Elite',
        description: 'Competencia exclusiva para jugadores de alto nivel',
        imageUrl: 'assets/images/tournament2.jpg',
        date: new Date('2025-04-25'),
        status: 'active',
        participants: 12,
        maxParticipants: 12
      },
      {
        id: 3,
        name: 'Torneo Relámpago',
        description: 'Torneo rápido de eliminación directa',
        imageUrl: 'assets/images/tournament3.jpg',
        date: new Date('2025-04-20'),
        status: 'finished',
        participants: 8,
        maxParticipants: 8
      },
      {
        id: 3,
        name: 'Torneo Relámpago',
        description: 'Torneo rápido de eliminación directa',
        imageUrl: 'assets/images/tournament3.jpg',
        date: new Date('2025-04-20'),
        status: 'finished',
        participants: 8,
        maxParticipants: 8
      },
      {
        id: 1,
        name: 'Torneo de Primavera',
        description: 'Gran torneo de primavera con premios increíbles',
        imageUrl: 'assets/images/tournament1.jpg',
        date: new Date('2025-05-15'),
        status: 'upcoming',
        participants: 8,
        maxParticipants: 16
      },
      {
        id: 2,
        name: 'Copa Elite',
        description: 'Competencia exclusiva para jugadores de alto nivel',
        imageUrl: 'assets/images/tournament2.jpg',
        date: new Date('2025-04-25'),
        status: 'active',
        participants: 12,
        maxParticipants: 12
      },
      {
        id: 3,
        name: 'Torneo Relámpago',
        description: 'Torneo rápido de eliminación directa',
        imageUrl: 'assets/images/tournament3.jpg',
        date: new Date('2025-04-20'),
        status: 'finished',
        participants: 8,
        maxParticipants: 8
      },
    ];
    this.filteredTournaments = this.tournaments;
  }

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredTournaments = this.tournaments;
    } else {
      this.filteredTournaments = this.tournaments.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }
  }

  onJoinTournament(tournament: Tournament) {
    if (tournament.status !== 'finished') {
      this.router.navigate(['/home']);
    }
  }
}
