import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor() {}

  ShowConfirmDialog(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Crear fondo oscuro
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      // Crear cuadro de diálogo
      const dialog = document.createElement('div');
      dialog.classList.add('dialog');
      dialog.innerHTML = `
        <span class="material-symbols-outlined icon-dialog-info">help</span>
        <p class="dialog_message">${message}</p>`;

      // Botones
      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn_container');

      const btnOk = document.createElement('button');
      btnOk.innerText = 'Aceptar';
      btnOk.classList.add('btn', 'save');

      const btnCancel = document.createElement('button');
      btnCancel.innerText = 'Cancelar';
      btnCancel.classList.add('btn', 'delete');

      // Eventos de los botones
      btnOk.onclick = () => {
        dialog.classList.add('closing');
        overlay.classList.add('closing-2');
        setTimeout(() => {
          document.body.removeChild(overlay);
          resolve(true);
        }, 100); // Esperar la animación de salida
      };

      btnCancel.onclick = () => {
        dialog.classList.add('closing');
        overlay.classList.add('closing-2');
        setTimeout(() => {
          document.body.removeChild(overlay);
          resolve(false);
        }, 100);
      };

      // Agregar botones al contenedor
      btnContainer.appendChild(btnCancel);
      btnContainer.appendChild(btnOk);

      // Agregar elementos al diálogo
      dialog.appendChild(btnContainer);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
    });
  }

  toastSuccess(message: string) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.classList.add('toast-container');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.classList.add('toast');

    toast.innerHTML =  `
    <span class="material-symbols-outlined icon-toast-success">help</span>
    <p class="dialog_message">${message}</p>`;

    container.appendChild(toast);

    // Pequeño retraso para que la animación de entrada funcione
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => this.removeToast(toast), 2000);
  }

  private async removeToast(toast: HTMLDivElement){
    toast.classList.add("hide"); 
    setTimeout(() => toast.remove(), 500); 
  }
}
