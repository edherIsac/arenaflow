import { Component } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-team-admin',
  templateUrl: './team-admin.component.html',
  styleUrls: ['./team-admin.component.scss']
})
export class TeamAdminComponent {

  constructor(private dialog: DialogService){}

  async dialogDelete(){
    const res = await this.dialog.ShowConfirmDialog(`¿Desea eliminar este equipo?`)
    console.log(res);
    
  }
}
