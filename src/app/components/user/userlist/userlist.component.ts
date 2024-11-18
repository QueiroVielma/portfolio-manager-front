import { Component, inject } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  users: User[] = [];

  userService = inject(UserService);

  constructor() {
    this.loadUsers();
  }


  // Carrega os usuários
  loadUsers(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        Swal.fire('Erro ao carregar usuários!', '', 'error');
      }
    });
  }

  obterCargo(positionUser: number): string {
    switch (positionUser) {
      case 1: return 'Gerente';
      case 2: return 'Desenvolvedor';
      case 3: return 'Tester';
      case 4: return 'Analista';
      default: return 'Não definido';
    }
  }

  editar(user: User): void {
    Swal.fire('Funcionalidade de edição ainda não implementada!', '', 'info');
  }
}
