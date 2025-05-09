import { Component } from '@angular/core';

interface Team {
  position: number;
  team: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  last5: string[];
}

interface Scorer {
  position: number;
  name: string;
  team: string;
  goals: number;
  matches: number;
  avg: number;
}

interface Group {
  name: string;
  teams: Team[];
}

interface Category {
  name: string;
  groups: Group[];
}

// Utilidad para generar equipos dummy
function generateTeams(category: string, group: string, count: number): Team[] {
  const teamNames = Array.from({length: count}, (_, i) => `${category} ${group ? group + ' ' : ''}Equipo ${i+1}`);
  return teamNames.map((name, idx) => ({
    position: idx + 1,
    team: name,
    logo: 'assets/img/equipo1.png',
    played: 15,
    wins: Math.floor(Math.random() * 16),
    draws: Math.floor(Math.random() * 8),
    losses: Math.floor(Math.random() * 8),
    gf: Math.floor(Math.random() * 40),
    ga: Math.floor(Math.random() * 40),
    gd: Math.floor(Math.random() * 20) - 10,
    points: Math.floor(Math.random() * 50),
    last5: Array.from({length: 5}, () => ['W', 'D', 'L'][Math.floor(Math.random()*3)])
  }));
}

// Utilidad para generar goleadores dummy
function generateScorers(category: string, group: string, count: number): Scorer[] {
  const playerNames = ['Juan', 'Pedro', 'Luis', 'Carlos', 'Miguel', 'Jorge', 'Fernando', 'Ricardo', 'Eduardo', 'Roberto'];
  return Array.from({length: count}, (_, i) => ({
    position: i + 1,
    name: `${playerNames[Math.floor(Math.random() * playerNames.length)]} ${playerNames[Math.floor(Math.random() * playerNames.length)]}`,
    team: `${category} ${group ? group + ' ' : ''}Equipo ${Math.floor(Math.random() * 16) + 1}`,
    goals: Math.floor(Math.random() * 30) + 1,
    matches: Math.floor(Math.random() * 15) + 1,
    avg: parseFloat(((Math.random() * 2) + 0.5).toFixed(2))
  }));
}

@Component({
  selector: 'app-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent {
  categories: Category[] = [
    {
      name: 'Femenil',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Femenil', '', 16) }
      ]
    },
    {
      name: 'Reservas',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Reservas', '', 16) }
      ]
    },
    {
      name: 'Especiales',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Especiales', '', 16) }
      ]
    },
    {
      name: 'Premier',
      groups: [
        { name: 'Grupo A', teams: generateTeams('Premier', 'A', 16) },
        { name: 'Grupo B', teams: generateTeams('Premier', 'B', 16) }
      ]
    },
    {
      name: 'Veteranos Premier',
      groups: [
        { name: 'Grupo A', teams: generateTeams('Veteranos Premier', 'A', 16) },
        { name: 'Grupo B', teams: generateTeams('Veteranos Premier', 'B', 16) }
      ]
    },
    {
      name: 'Veteranos B',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Veteranos B', '', 16) }
      ]
    },
    {
      name: 'Veteranos C',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Veteranos C', '', 16) }
      ]
    },
    {
      name: 'Master Premier',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Master Premier', '', 16) }
      ]
    },
    {
      name: 'Master Oro',
      groups: [
        { name: 'Grupo Único', teams: generateTeams('Master Oro', '', 16) }
      ]
    }
  ];

  selectedCategory: Category = this.categories[0];
  selectedGroup: Group = this.categories[0].groups[0];

  // Tabs para seleccionar la vista de estadísticas
  statisticsTabs = [
    { key: 'standings', label: 'Tabla de Posiciones' },
    { key: 'scorers', label: 'Tabla de Goleadores' },
    // Puedes agregar más tabs aquí
  ];
  selectedTab: string = 'standings';

  setStatisticsTab(tab: string) {
    this.selectedTab = tab;
  }

  get standings() {
    return this.selectedGroup.teams;
  }

  get scorers() {
    // Datos dummy por ahora
    return generateScorers(this.selectedCategory.name, this.selectedGroup.name, 20);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? '';
    const category = this.categories.find(cat => cat.name === value);
    if (category) {
      this.selectedCategory = category;
      this.selectedGroup = category.groups[0];
    } else {
      this.selectedCategory = this.categories[0];
      this.selectedGroup = this.categories[0].groups[0];
    }
  }

  onCategoryChangeModel(category: Category) {
    this.selectedCategory = category;
    this.selectedGroup = category.groups[0];
  }

  onGroupChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? '';
    const group = this.selectedCategory.groups.find(g => g.name === value);
    if (group) {
      this.selectedGroup = group;
    } else {
      this.selectedGroup = this.selectedCategory.groups[0];
    }
  }

  onGroupTabClick(groupName: string) {
    const group = this.selectedCategory.groups.find(g => g.name === groupName);
    if (group) {
      this.selectedGroup = group;
    } else {
      this.selectedGroup = this.selectedCategory.groups[0];
    }
  }

  getResultIcon(result: string) {
    switch(result) {
      case 'W': return '✔️';
      case 'D': return '➖';
      case 'L': return '❌';
      default: return '';
    }
  }
}
