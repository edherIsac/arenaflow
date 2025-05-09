import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  photoPreview: string | ArrayBuffer | null = null;

  // Nuevas propiedades para la información de perfil
  registrationDate: string = '2024-01-15';
  tournamentsOrganized: number = 5;
  totalParticipantsManaged: number = 154;
  tournamentHistory: Array<{ id: number; name: string; date: string; participants: number }> = [
    { id: 1, name: 'Torneo Invierno', date: '2024-02-10', participants: 32 },
    { id: 2, name: 'Torneo Primavera', date: '2024-03-20', participants: 28 },
    { id: 3, name: 'Torneo Verano', date: '2024-04-05', participants: 45 },
    { id: 4, name: 'Torneo Otoño', date: '2024-05-10', participants: 22 },
    { id: 5, name: 'Torneo Relámpago', date: '2024-06-01', participants: 27 }
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['Juan Pérez', [Validators.required]],
      email: ['juan.perez@email.com', [Validators.required, Validators.email]]
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result!;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Aquí iría la lógica para guardar el perfil
      alert('Perfil actualizado correctamente.');
    }
  }

  // Métodos para acciones adicionales
  onChangePassword(): void {
    alert('Funcionalidad para cambiar la contraseña próximamente.');
  }

  onDeleteAccount(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Aquí iría la lógica para eliminar la cuenta
      alert('Cuenta eliminada (simulado).');
    }
  }

  // Métodos para acciones administrativas rápidas
  onCreateTournament(): void {
    alert('Redirigiendo a la creación de torneo (funcionalidad próximamente disponible).');
    // Aquí podrías usar el router para navegar a la página de creación de torneo
    // this.router.navigate(['/crear-torneo']);
  }

  onManageTournaments(): void {
    alert('Redirigiendo a la gestión de torneos (funcionalidad próximamente disponible).');
    // this.router.navigate(['/mis-torneos']);
  }

  onViewReports(): void {
    alert('Redirigiendo a reportes (funcionalidad próximamente disponible).');
    // this.router.navigate(['/reportes']);
  }

  onManageUsers(): void {
    alert('Redirigiendo a la gestión de usuarios (funcionalidad próximamente disponible).');
    // this.router.navigate(['/usuarios']);
  }
}
