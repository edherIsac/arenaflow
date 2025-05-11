import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Player {
  id?: number;
  name: string;
  lastName: string;
  team: string;
  position: string;
  birthDate: string;
  height?: number;
  weight?: number;
  photo?: string;
}

@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.scss']
})
export class AdminPlayersComponent implements OnInit {
  players: Player[] = [
    { id: 1, name: 'Juan', lastName: 'Pérez', team: 'Águilas', position: 'Delantero', birthDate: '1995-05-15', height: 180, weight: 75, photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Carlos', lastName: 'Rodríguez', team: 'Leones', position: 'Defensa', birthDate: '1992-11-22', height: 185, weight: 80, photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 3, name: 'María', lastName: 'García', team: 'Tigres', position: 'Mediocampista', birthDate: '1993-07-10', height: 170, weight: 65, photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 4, name: 'Luis', lastName: 'Martínez', team: 'Pumas', position: 'Portero', birthDate: '1990-03-25', height: 190, weight: 85, photo: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 5, name: 'Ana', lastName: 'López', team: 'Águilas', position: 'Defensa', birthDate: '1994-09-18', height: 175, weight: 68, photo: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 6, name: 'Roberto', lastName: 'Sánchez', team: 'Leones', position: 'Delantero', birthDate: '1991-12-05', height: 182, weight: 78, photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 7, name: 'Sofía', lastName: 'Ramírez', team: 'Tigres', position: 'Mediocampista', birthDate: '1996-02-14', height: 168, weight: 62, photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 8, name: 'Diego', lastName: 'Hernández', team: 'Pumas', position: 'Defensa', birthDate: '1989-06-30', height: 188, weight: 82, photo: 'https://randomuser.me/api/portraits/men/5.jpg' }
  ];
  filteredPlayers: Player[] = [];
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredPlayers = this.players;
  }

  navigateToPlayerForm(): void {
    this.router.navigate(['/players/form']);
  }

  filterPlayers(): void {
    if (!this.searchTerm) {
      this.filteredPlayers = this.players;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredPlayers = this.players.filter(player => 
        player.name.toLowerCase().includes(term) ||
        player.lastName.toLowerCase().includes(term) ||
        player.team.toLowerCase().includes(term) ||
        player.position.toLowerCase().includes(term)
      );
    }
  }

  calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  editPlayer(player: Player): void {
    this.router.navigate([`/players/edit/${player.id}`]);
  }

  deletePlayer(player: Player): void {
    const index = this.players.findIndex(p => p.id === player.id);
    if (index !== -1) {
      this.players.splice(index, 1);
      this.filterPlayers();
    }
  }
}
