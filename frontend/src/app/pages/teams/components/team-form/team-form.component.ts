import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface Player {
  id?: number;
  nombre: string;
  apellido: string;
  documento: string;
  posicion: string;
  foto?: string;
}

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  teamForm: FormGroup;
  logoFile: File | null = null;
  logoPreview: string | undefined = undefined;

  @ViewChild('logoInputRef') logoInputRef!: ElementRef<HTMLInputElement>;

  // Imagen por defecto si no hay logo
  defaultLogo = 'assets/img/equipo1.png';

  // Lista de categorías de ejemplo
  categories: string[] = ['Infantil', 'Juvenil', 'Libre', 'Femenil', 'Veteranos'];

  // Lista de jugadores en el equipo
  players: Player[] = [];
  
  // Estado del modal
  isModalVisible: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Configurar el formulario del equipo
    this.teamForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
    
  }
  
  handleModalClose(): void {
    this.isModalVisible = false;
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.logoPreview = reader.result;
        }
      };
      if (this.logoFile) {
        reader.readAsDataURL(this.logoFile);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/teams/admin']);
  }

  onAddPlayer() {
    this.isModalVisible = true;
  }
  
  onEditPlayer(index: number) {
    console.log('Editar jugador', index);
  }
  
  onDeletePlayer(index: number) {
    console.log('Eliminar jugador', index);
  }
  
  onExportCredentials() {
    console.log('Exportando credenciales del equipo');
  }

  onSelectPlayer(player: any){
    console.log('Seleccionado jugador', player);
    this.isModalVisible = false;
    this.players.push({
      nombre: player.firstName,
      apellido: player.lastName,
      documento: '',
      posicion: player.position,
      foto: ''
    });
  }
}

