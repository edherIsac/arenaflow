import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface Player {
  id?: number;
  name: string;
  lastName: string;
  team: string;
  position: string;
  birthDate: string;
  height: number;
  weight: number;
  photo?: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerForm: FormGroup;
  isEditMode = false;
  selectedImage: string | ArrayBuffer | null = null;

  teams: string[] = ['Águilas', 'Leones', 'Tigres', 'Pumas'];
  positions: string[] = ['Delantero', 'Defensa', 'Mediocampista', 'Portero'];

  // Mock de base de datos de jugadores
  private players: Player[] = [
    { id: 1, name: 'Juan', lastName: 'Pérez', team: 'Águilas', position: 'Delantero', birthDate: '1995-05-15', height: 180, weight: 75, photo: 'assets/player1.jpg' },
    { id: 2, name: 'Carlos', lastName: 'Rodríguez', team: 'Leones', position: 'Defensa', birthDate: '1992-11-22', height: 185, weight: 80 }
  ];

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      team: ['', Validators.required],
      position: ['', Validators.required],
      birthDate: ['', [Validators.required, this.dateValidator]],
      height: ['', [Validators.required, Validators.min(100), Validators.max(250)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(150)]]
    });
  }

  ngOnInit(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    if (playerId) {
      this.isEditMode = true;
      const player = this.findPlayerById(Number(playerId));
      if (player) {
        this.playerForm.patchValue(player);
      }
    }
  }

  dateValidator(control: AbstractControl): {[key: string]: any} | null {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    
    if (inputDate > currentDate) {
      return { 'futureDate': true };
    }
    
    return null;
  }

  findPlayerById(id: number): Player | undefined {
    return this.players.find(player => player.id === id);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.markFormGroupTouched(this.playerForm);

    if (this.playerForm.valid) {
      const playerData: Player = this.playerForm.value;

      if (this.isEditMode) {
        const playerId = this.route.snapshot.paramMap.get('id');
        const index = this.players.findIndex(p => p.id === Number(playerId));
        if (index !== -1) {
          this.players[index] = { ...this.players[index], ...playerData };
        }
      } else {
        playerData.id = this.players.length + 1;
        this.players.push(playerData);
      }

      this.router.navigate(['/players/admin']);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/players/admin']);
  }
}
