import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export interface PlayerStats {
  wins: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  gamesPlayed: number;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  jerseyNumber: number;
  avatar: string;
  stats: PlayerStats;
  rating?: number;
  // Propiedades opcionales para el modal
  name?: string;
  sport?: string;
  age?: number;
  height?: string;
  weight?: string;
  nationality?: string;
  bio?: string;
}

interface Sport {
  id: string;
  name: string;
}

interface Position {
  id: string;
  name: string;
}

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {
  searchQuery: string = '';
  selectedSport: string = '';
  selectedPosition: string = '';
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  hasSearched: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;

  isModalVisible: boolean = false;
  selectedPlayer: Player | null = null; // Este será el jugador con todas las propiedades necesarias para el modal

  @Output() onSelectPlayer = new EventEmitter<Player>();

  sports: Sport[] = [
    { id: 'football', name: 'Fútbol' },
    { id: 'basketball', name: 'Baloncesto' },
    { id: 'tennis', name: 'Tenis' },
    { id: 'volleyball', name: 'Voleibol' },
  ];

  positions: Position[] = [
    { id: 'goalkeeper', name: 'Portero' },
    { id: 'defender', name: 'Defensa' },
    { id: 'midfielder', name: 'Mediocampista' },
    { id: 'forward', name: 'Delantero' },
  ];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
    this.loadSamplePlayers();
    // In a real app, you would call a service to fetch initial data
  }

  searchPlayers(): void {
    this.hasSearched = true;
    this.currentPage = 1;
    
    // In a real app, you would call a service here to fetch players from an API
    // For now, we'll simulate a filtered list
    this.filterPlayers();
    this.calculatePagination();
  }

  private filterPlayers(): void {
    // In a real app, this would be handled by the API
    // This is just a simple client-side filter for demonstration
    this.filteredPlayers = this.players.filter(player => {
      const matchesSearch = !this.searchQuery || 
        (player.firstName + ' ' + player.lastName).toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesSport = !this.selectedSport || player.sport === this.selectedSport;
      const matchesPosition = !this.selectedPosition || player.position === this.selectedPosition;
      
      return matchesSearch && matchesSport && matchesPosition;
    });
  }

  private calculatePagination(): void {
    this.totalItems = this.filteredPlayers.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // In a real app, you would fetch the data for this page from the API
    }
  }

  viewPlayer(player: any): void {
    // Implementación para ver detalles del jugador
    console.log('Ver jugador:', player);
    this.isModalVisible = true;
  }

  openModal(player: Player): void {
    // Crear un nuevo objeto con todas las propiedades necesarias para el modal
    // const playerForModal: Player = {
    //   ...player,
    //   name: player.firstName,
    //   sport: 'Fútbol',
    //   age: 25, // Valor por defecto
    //   height: '1.75 m', // Valor por defecto
    //   weight: '70 kg', // Valor por defecto
    //   nationality: 'México', // Valor por defecto
    //   bio: 'Jugador destacado con gran trayectoria en el deporte.'
    // };
    // this.selectedPlayer = playerForModal;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedPlayer = null;
  }

  addToTeam(player: Player): void {
    // Add player to the current team
    console.log('Adding player to team:', player);
    // In a real app, you would call a service to add the player to the team
    this.onSelectPlayer.emit(player);
  }

  isPlayerInTeam(player: Player): boolean {
    // Check if player is already in the team
    // This is a placeholder - implement your own logic
    return false;
  }

  // This would be populated from an API in a real app
  private loadSamplePlayers(): void {
    this.players = [
      {
        id: '1',
        firstName: 'Lionel',
        lastName: 'Messi',
        position: 'Delantero',
        team: 'Inter Miami',
        jerseyNumber: 10,
        avatar: 'https://via.placeholder.com/150',
        stats: {
          wins: 12,
          goals: 8,
          assists: 5,
          yellowCards: 2,
          redCards: 0,
          gamesPlayed: 15
        },
        rating: 4.8
      },
      {
        id: '2',
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
        position: 'Delantero',
        team: 'Al-Nassr',
        jerseyNumber: 7,
        avatar: 'https://via.placeholder.com/150',
        stats: {
          wins: 10,
          goals: 12,
          assists: 3,
          yellowCards: 1,
          redCards: 0,
          gamesPlayed: 14
        },
        rating: 4.9
      },
      {
        id: '1',
        firstName: 'Lionel',
        lastName: 'Messi',
        position: 'Delantero',
        team: 'Inter Miami',
        jerseyNumber: 10,
        avatar: 'https://via.placeholder.com/150',
        stats: {
          wins: 12,
          goals: 8,
          assists: 5,
          yellowCards: 2,
          redCards: 0,
          gamesPlayed: 15
        },
        rating: 4.8
      },
      {
        id: '2',
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
        position: 'Delantero',
        team: 'Al-Nassr',
        jerseyNumber: 7,
        avatar: 'https://via.placeholder.com/150',
        stats: {
          wins: 10,
          goals: 12,
          assists: 3,
          yellowCards: 1,
          redCards: 0,
          gamesPlayed: 14
        },
        rating: 4.9
      },
      {
        id: '1',
        firstName: 'Lionel',
        lastName: 'Messi',
        position: 'Delantero',
        team: 'Inter Miami',
        jerseyNumber: 10,
        avatar: 'https://via.placeholder.com/150',
        stats: {
          wins: 12,
          goals: 8,
          assists: 5,
          yellowCards: 2,
          redCards: 0,
          gamesPlayed: 15
        },
        rating: 4.8
      },
      {
        id: '2',
        firstName: 'Cristiano',
        lastName: 'Ronaldo',
        position: 'Delantero',
        team: 'Al-Nassr',
        jerseyNumber: 7,
        avatar: 'https://via.placeholder.com/150',
        stats: {
          wins: 10,
          goals: 12,
          assists: 3,
          yellowCards: 1,
          redCards: 0,
          gamesPlayed: 14
        },
        rating: 4.9
      }
    ];
    this.filteredPlayers = [...this.players];
  }

  handleModalClose(){
    this.isModalVisible = false;
  }
}
