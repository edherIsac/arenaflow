import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Player {
  nombre: string;
  apellido: string;
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
  logoPreview: string | ArrayBuffer | null = null;

  @ViewChild('logoInputRef') logoInputRef!: ElementRef<HTMLInputElement>;

  // Imagen por defecto si no hay logo
  defaultLogo = 'assets/img/equipo1.png';

  // Lista de categorías de ejemplo
  categories: string[] = ['Infantil', 'Juvenil', 'Libre', 'Femenil', 'Veteranos'];

  players: Player[] = [
    { nombre: 'Juan', apellido: 'Pérez', posicion: 'Delantero', foto: '' },
    { nombre: 'Luis', apellido: 'García', posicion: 'Portero', foto: '' }
  ];

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  triggerLogoInput() {
    const logoInput = document.getElementById('logoInput') as HTMLInputElement;
    if (logoInput) logoInput.click();
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }

  onAddPlayer() {
    const nombre = prompt('Nombre del jugador:');
    const apellido = prompt('Apellido del jugador:');
    const posicion = prompt('Posición:');
    // Simulación: en un modal real, permitir subir foto
    if (nombre && apellido && posicion) {
      this.players.push({ nombre, apellido, posicion, foto: '' });
    }
  }

  onEditPlayer(index: number) {
    const player = this.players[index];
    const nombre = prompt('Nuevo nombre:', player.nombre) || player.nombre;
    const apellido = prompt('Nuevo apellido:', player.apellido) || player.apellido;
    const posicion = prompt('Nueva posición:', player.posicion) || player.posicion;
    // Simulación: en un modal real, permitir cambiar foto
    this.players[index] = { ...player, nombre, apellido, posicion };
  }

  onDeletePlayer(index: number) {
    if (confirm('¿Seguro que deseas eliminar este jugador?')) {
      this.players.splice(index, 1);
    }
  }

  onExportCredentials() {
    alert('Funcionalidad de exportar credenciales próximamente.');
  }

  onSubmit() {
    if (this.teamForm.valid) {
      const formData = new FormData();
      formData.append('name', this.teamForm.value.name);
      formData.append('category', this.teamForm.value.category);
      if (this.logoFile) {
        formData.append('logo', this.logoFile);
      }
      console.log('Equipo:', this.teamForm.value);
      console.log('Logo:', this.logoFile);
      console.log('Jugadores:', this.players);
    }
  }
}
