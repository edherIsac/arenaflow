import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tournaments-layout',
  templateUrl: './tournaments-layout.component.html',
  styleUrls: ['./tournaments-layout.component.scss']
})
export class TournamentsLayoutComponent {
  searchQuery: string = '';
  isProfileMenuOpen: boolean = false;
  username: string = 'John Doe'; // Esto vendrá del servicio de autenticación
  userPhotoUrl: string = 'assets/iconos/Designer.png'; // URL por defecto

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const profileMenu = document.querySelector('.profile-menu');
    
    if (profileMenu && !profileMenu.contains(target)) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  onSearch(): void {
    // Implementar lógica de búsqueda
    console.log('Buscando:', this.searchQuery);
  }
}
